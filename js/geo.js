let geoReady = false;
let geoFeatures = [];

async function loadGeo() {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const topo = await res.json();
    geoFeatures = topoToGeo(topo);
    geoReady = true;
  } catch (e) {
    console.warn('GeoJSON load failed — globe renders without landmasses', e);
    geoReady = false;
  }
}

function topoToGeo(topo) {
  const obj       = topo.objects.countries;
  const arcs      = topo.arcs;
  const scale     = topo.transform?.scale     || [1, 1];
  const translate = topo.transform?.translate || [0, 0];

  function decodeArc(arc) {
    let x = 0, y = 0;
    return arc.map(pt => { x += pt[0]; y += pt[1]; return [x, y]; });
  }

  const decodedArcs = arcs.map(decodeArc);

  function getArcPts(idx) {
    const reverse = idx < 0;
    const arc = decodedArcs[reverse ? ~idx : idx];
    const pts = reverse ? [...arc].reverse() : arc;
    return pts.map(pt => [
      pt[0] * scale[0] + translate[0],
      pt[1] * scale[1] + translate[1]
    ]);
  }

  function ringToCoords(ring) {
    return ring.flatMap((idx, i) => {
      const pts = getArcPts(idx);
      return i === 0 ? pts : pts.slice(1);
    });
  }

  const features = [];
  for (const geom of obj.geometries) {
    if (geom.type === 'Polygon') {
      features.push({ type: 'Polygon', coords: geom.arcs.map(ringToCoords) });
    } else if (geom.type === 'MultiPolygon') {
      for (const poly of geom.arcs) {
        features.push({ type: 'Polygon', coords: poly.map(ringToCoords) });
      }
    }
  }
  return features;
}

loadGeo();

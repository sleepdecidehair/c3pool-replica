import type { Arc, Marker } from "cobe";

export const REGION_MARKERS: Marker[] = [
  { location: [39.0438, -77.4874], size: 0.09 },
  { location: [-23.5505, -46.6333], size: 0.09 },
  { location: [50.1109, 8.6821], size: 0.09 },
  { location: [1.3521, 103.8198], size: 0.09 },
];

export const CITY_MARKERS: Marker[] = [
  { location: [39.9042, 116.4074], size: 0.04, color: [0.78, 0.46, 0.14] },
  { location: [31.2304, 121.4737], size: 0.04, color: [0.78, 0.46, 0.14] },
  { location: [22.5431, 114.0579], size: 0.04, color: [0.78, 0.46, 0.14] },
  { location: [23.1291, 113.2644], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [30.5728, 104.0668], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [30.2741, 120.1551], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [34.3416, 108.9398], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [29.563, 106.5516], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [22.3193, 114.1694], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [25.033, 121.5654], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [32.0603, 118.7969], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [30.5928, 114.3055], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [39.0842, 117.2009], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [36.0671, 120.3826], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [38.914, 121.6147], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [41.8057, 123.4315], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [24.4798, 118.0894], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [26.0745, 119.2965], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [25.0389, 102.7183], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [28.2278, 112.9388], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [34.7466, 113.6254], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [45.8038, 126.5349], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [43.8256, 87.6168], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [22.6273, 120.3014], size: 0.025, color: [0.78, 0.46, 0.14] },
  { location: [24.1477, 120.6736], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [36.6512, 117.12], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [31.2989, 120.5853], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [35.6762, 139.6503], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [34.6937, 135.5023], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [35.1815, 136.9066], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [33.5904, 130.4017], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [43.0618, 141.3545], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [35.0116, 135.7681], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [37.5665, 126.978], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [35.1796, 129.0756], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [37.4563, 126.7052], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [13.7563, 100.5018], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [-6.2088, 106.8456], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [14.5995, 120.9842], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [3.139, 101.6869], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [10.8231, 106.6297], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [21.0285, 105.8542], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [16.8661, 96.1951], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [11.5564, 104.9282], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [10.3157, 123.8854], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-8.6705, 115.2126], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [19.076, 72.8777], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [28.6139, 77.209], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [12.9716, 77.5946], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [13.0827, 80.2707], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [22.5726, 88.3639], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [17.385, 78.4867], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [18.5204, 73.8567], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [24.8607, 67.0011], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [31.5204, 74.3587], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [33.6844, 73.0479], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [23.8103, 90.4125], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [6.9271, 79.8612], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [25.2048, 55.2708], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [35.6892, 51.389], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [41.0082, 28.9784], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [24.7136, 46.6753], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [25.2854, 51.531], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [32.0853, 34.7818], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [21.4858, 39.1925], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [29.3759, 47.9774], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [33.8938, 35.5018], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [31.9454, 35.9284], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [33.3152, 44.3661], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [23.5859, 58.4059], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [55.7558, 37.6173], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [59.9311, 30.3609], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [55.0084, 82.9357], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [56.8389, 60.6057], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [55.8304, 49.0661], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [47.2357, 39.7015], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [43.1332, 131.9113], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [56.0104, 92.8526], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [52.287, 104.305], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [50.4501, 30.5234], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [53.9006, 27.559], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [51.1694, 71.4491], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [43.222, 76.8512], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [41.2995, 69.2401], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [42.8746, 74.5698], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [40.4093, 49.8671], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [47.8864, 106.9057], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [40.7128, -74.006], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [34.0522, -118.2437], size: 0.032, color: [0.78, 0.46, 0.14] },
  { location: [37.7749, -122.4194], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [41.8781, -87.6298], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [47.6062, -122.3321], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [32.7767, -96.797], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [25.7617, -80.1918], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [29.7604, -95.3698], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [33.4484, -112.074], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [42.3601, -71.0589], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [33.749, -84.388], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [39.7392, -104.9903], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [30.2672, -97.7431], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [39.9526, -75.1652], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [45.5152, -122.6784], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [36.1699, -115.1398], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [43.6532, -79.3832], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [45.5017, -73.5673], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [49.2827, -123.1207], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [51.0447, -114.0719], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [51.5074, -0.1278], size: 0.035, color: [0.78, 0.46, 0.14] },
  { location: [48.8566, 2.3522], size: 0.03, color: [0.78, 0.46, 0.14] },
  { location: [52.3676, 4.9041], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [52.52, 13.405], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [48.1351, 11.582], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [53.5511, 9.9937], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [40.4168, -3.7038], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [41.3851, 2.1734], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [41.9028, 12.4964], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [45.4642, 9.19], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [47.3769, 8.5417], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [48.2082, 16.3738], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [50.8503, 4.3517], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [55.6761, 12.5683], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [53.3498, -6.2603], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [60.1699, 24.9384], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [59.9139, 10.7522], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [59.3293, 18.0686], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [38.7223, -9.1393], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [52.2297, 21.0122], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [50.0755, 14.4378], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [47.4979, 19.0402], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [44.4268, 26.1025], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [42.6977, 23.3219], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [44.7866, 20.4489], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [37.9838, 23.7275], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [56.9496, 24.1052], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [19.4326, -99.1332], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [25.6866, -100.3161], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [20.6597, -103.3496], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-22.9068, -43.1729], size: 0.028, color: [0.78, 0.46, 0.14] },
  { location: [-15.7942, -47.8822], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [-34.6037, -58.3816], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [-33.4489, -70.6693], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [4.711, -74.0721], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [-12.0464, -77.0428], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [10.4806, -66.9036], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-0.1807, -78.4678], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-34.9011, -56.1645], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [8.9824, -79.5199], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [23.1136, -82.3666], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-26.2041, 28.0473], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [-33.9249, 18.4241], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [30.0444, 31.2357], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [6.5244, 3.3792], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [-1.2864, 36.8172], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [33.5731, -7.5898], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [9.145, 40.4897], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [36.7372, 3.0866], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [36.8065, 10.1815], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [5.6037, -0.187], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-33.8688, 151.2093], size: 0.026, color: [0.78, 0.46, 0.14] },
  { location: [-37.8136, 144.9631], size: 0.024, color: [0.78, 0.46, 0.14] },
  { location: [-27.4698, 153.0251], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-31.9505, 115.8605], size: 0.022, color: [0.78, 0.46, 0.14] },
  { location: [-36.8485, 174.7633], size: 0.022, color: [0.78, 0.46, 0.14] },
];

export const GLOBE_MARKERS: Marker[] = [...REGION_MARKERS, ...CITY_MARKERS];

export const ARC_COLOR: [number, number, number] = [1, 0.58, 0.2];
const ARC_DURATION_MS = 4200;
const ARC_HOLD_MS = 2400;
const ARC_FADE_IN_MS = 900;
const ARC_FADE_OUT_MS = 900;
const ARC_COUNT = 10;
const REGION_LOCATIONS: Array<[number, number]> = REGION_MARKERS.map((marker) => marker.location);

interface AnimatedArc {
  from: [number, number];
  to: [number, number];
  startTime: number;
  id: string;
}

function squaredDistance(from: [number, number], to: [number, number]): number {
  const deltaLat = from[0] - to[0];
  const rawDeltaLon = Math.abs(from[1] - to[1]);
  const deltaLon = rawDeltaLon > 180 ? 360 - rawDeltaLon : rawDeltaLon;
  return deltaLat * deltaLat + deltaLon * deltaLon;
}

function nearestRegion(location: [number, number]): [number, number] {
  let best = REGION_LOCATIONS[0];
  let bestDistance = squaredDistance(location, best);
  for (let index = 1; index < REGION_LOCATIONS.length; index += 1) {
    const candidate = REGION_LOCATIONS[index];
    const distance = squaredDistance(location, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return best;
}

function createArc(now: number, id: string): AnimatedArc {
  const city = CITY_MARKERS[Math.floor(Math.random() * CITY_MARKERS.length)];
  return { from: city.location, to: nearestRegion(city.location), startTime: now, id };
}

function arcProgress(elapsed: number): number {
  if (elapsed < 0) return 0;
  if (elapsed < ARC_FADE_IN_MS) return elapsed / ARC_FADE_IN_MS;
  if (elapsed < ARC_FADE_IN_MS + ARC_HOLD_MS) return 1;
  const remaining = ARC_DURATION_MS - elapsed;
  return remaining > 0 ? remaining / ARC_FADE_OUT_MS : 0;
}

function mixColor(
  from: [number, number, number],
  to: [number, number, number],
  amount: number,
): [number, number, number] {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export function createArcAnimator(baseColor: [number, number, number]): (now: number) => Arc[] {
  const arcs: AnimatedArc[] = Array.from({ length: ARC_COUNT }, (_, index) =>
    createArc(performance.now() - (index * ARC_DURATION_MS) / ARC_COUNT, `arc-${index}`),
  );

  return (now: number): Arc[] =>
    arcs.map((arc, index) => {
      const current = now - arc.startTime >= ARC_DURATION_MS ? createArc(now, `arc-${index}`) : arc;
      arcs[index] = current;
      return {
        from: current.from,
        to: current.to,
        color: mixColor(baseColor, ARC_COLOR, arcProgress(now - current.startTime)),
        id: current.id,
      };
    });
}

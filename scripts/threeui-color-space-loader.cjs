// ThreeUI Community 1.2.0 uses pre-r152 color APIs in its temple renderer.
// Translate only those assignments for the portfolio's installed Three.js.
module.exports = function threeuiColorSpaceLoader(source) {
  return source
    .replace(/\.outputEncoding\b/g, ".outputColorSpace")
    .replace(/\.encoding\b/g, ".colorSpace")
    .replace(/\bo\.LinearEncoding\b/g, "o.LinearSRGBColorSpace")
    .replace(/\bo\.sRGBEncoding\b/g, "o.SRGBColorSpace")
    // Mapped materials now expose vMapUv rather than the old generic vUv.
    .replace(/\bvUv\.([xy])\b/g, "vMapUv.$1")
    .replace(/\bo\.PCFSoftShadowMap\b/g, "o.PCFShadowMap")
    // Keep the package's film grain quiet behind academic typography.
    .replace("uGrain: { value: 0.02 }", "uGrain: { value: 0.002 }")
    // The camera is reset from the package path each frame, so this reversible
    // offset never accumulates and leaves the cover at progress zero unchanged.
    .replace("V.position.copy(fe)", "fe.z += (Number(Be.dataset.coverDepth) || 0) * 4.2, fe.y += (Number(Be.dataset.coverDepth) || 0) * 0.8, V.position.copy(fe)");
};

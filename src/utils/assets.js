export function normalizeAsset(path = '') {
  if (!path) return null;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/')
  )
    return path;
  return '/' + path.replace(/^\.?\//, '');
}

export function pickCover(project) {
  const cand =
    project?.mainImage || (project?.images && project.images[0]) || null;
  return normalizeAsset(cand);
}

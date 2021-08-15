interface DotOptions {
  separator?: string;
  parser?: { (value: any): any };
}

function dot(
  data: any,
  options: DotOptions = { separator: '.', parser: null },
  current = {},
  path = '',
): { [K: string]: any } {
  const separator = options.separator || '.';
  const parser = options.parser || null;

  for (const [key, value] of Object.entries(data || {})) {
    const parent = path.length > 0 ? `${path}${separator}${key}` : key;

    if (typeof value === 'object') {
      current = Object.assign(
        current,
        this.dot(value, options, current, parent),
      );

      continue;
    }

    current[parent] = parser === null ? value : parser(value);
  }

  return current;
}

export default dot;

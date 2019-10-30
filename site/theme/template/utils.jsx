import flattenDeep from 'lodash/flattenDeep';
import flatten from 'lodash/flatten';

export function getMenuItems(moduleData, locale, categoryOrder, typeOrder) {
  const menuMeta = moduleData.map(item => item.meta);
  const menuItems = [];
  const sortFn = (a, b) => (a.order || 0) - (b.order || 0);
  menuMeta.sort(sortFn).forEach(meta => {
    if (!meta.category) {
      menuItems.push(meta);
    } else {
      const category = meta.category[locale] || meta.category;
      let group = menuItems.filter(i => i.title === category)[0];
      if (!group) {
        group = {
          type: 'category',
          title: category,
          children: [],
          order: categoryOrder[category],
        };
        menuItems.push(group);
      }
      if (meta.type) {
        let type = group.children.filter(i => i.title === meta.type)[0];
        if (!type) {
          type = {
            type: 'type',
            title: meta.type,
            children: [],
            order: typeOrder[meta.type],
          };
          group.children.push(type);
        }
        type.children.push(meta);
      } else {
        group.children.push(meta);
      }
    }
  });
  return menuItems
    .map(i => {
      if (i.children) {
        i.children = i.children.sort(sortFn);
      }
      return i;
    })
    .sort(sortFn);
}

export function getMetaDescription(jml) {
  const COMMON_TAGS = ['h1', 'h2', 'h3', 'p', 'img', 'a', 'code', 'strong'];
  if (!Array.isArray(jml)) return '';
  const paragraph = flattenDeep(
    jml
      .filter(item => {
        if (Array.isArray(item)) {
          const [tag] = item;
          return tag === 'p';
        }
        return false;
      })
      // ['p', ['code', 'aa'], 'bb'] => ['p', 'aabb']
      .map(item => {
        const [tag, ...others] = flatten(item);
        const content = others
          .filter(other => typeof other === 'string' && !COMMON_TAGS.includes(other))
          .join('');
        return [tag, content];
      }),
  ).find(p => p && typeof p === 'string' && !COMMON_TAGS.includes(p));
  return paragraph;
}


export function isZhCN(pathname) {
    return /-cn\/?$/.test(pathname);
}

export function getLocalizedPathname(path, zhCN) {
    const pathname = path.startsWith('/') ? path : `/${path}`;
    if (!zhCN) {
      // to enUS
      return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
    }
    if (pathname === '/') {
      return '/index-cn';
    }
    if (pathname.endsWith('/')) {
      return pathname.replace(/\/$/, '-cn/');
    }
    return `${pathname}-cn`;
  }
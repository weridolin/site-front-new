// import 'vite/dynamic-import-polyfill';

// export function filterAsnycRouter(asyncRouterMap: any) {
//     return asyncRouterMap.filter((route: any) => {
//         if (route.component == 'Layout') {
//             route.component = () => import('./layouts/BlankIndex.vue')
//         } else {
//             route.path = `${route.path}`
//             route.component = resolveComponent(route.component);
//         }
//         if (route.children != null && route.children && route.children.length) {
//             route.children = filterAsnycRouter(route.children);
//         }
//         return true;
//     })
// }

// const pages = import.meta.globEager('./views/**/*.vue');
// // 以 `./` 开头）或绝对路径（以 `/` 开头

// const resolveComponent = (name: any) => {
//     const importPage = pages[`./views/${name}.vue`];

//     if (!importPage) {
//         throw new Error(`Unknown page ${name}. Is it located under Pages with a .vue extension?`);
//     }

//     // return importPage().then(module => module.default);
//     return importPage.default
// }

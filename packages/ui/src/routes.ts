export const RouteHome = "/";

/**
 * It's important to note that the file based routing is very finicky.  If we use "products" as the directory name, then
 * the children are expecting to have a parent called "products.tsx" in the routes dir... this can be a simple component
 * with "<Outlet />" being the only thing it uses.  However, if "products_" is used as the dir name, then there will be
 * no expected parent.
 *
 * It's also good to note that there's a difference between the route ID and the actual route... had a discussion here
 * https://github.com/TanStack/router/issues/3282, but I lost that one, so the route files use the route ID, and the
 * rest of the navigation uses the actual route path.
 */
export const RouteViewProducts = "/products";

export const RouteViewProduct = `${RouteViewProducts}/$productId`;

export const RouteViewCart = "/cart";

export const RouteViewUsers = "/users";

export const RouteViewUser = `${RouteViewUsers}/$userId`;

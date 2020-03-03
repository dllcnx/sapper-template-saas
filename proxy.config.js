/**
 * 配置代理
 * 案例：
 * [
 *     {
 *         path: ['/map',...],
 *        target: 'http://xxx:380'
 *     },
 *    ...
 * ]
 */
const proxyArray = [
    {
        path: ['/test'],
        target: 'http://localhost:3000'
    }
]
export default proxyArray;
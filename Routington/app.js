const routington = require('routington');
const router = routington();

let route = router.define('/order');
route[0].label = "order_list";

route = router.define('/order/:id');
route[0].label = "order_view";

let listMatch = router.match('/order');
console.log("listMatch", listMatch);

let viewMatch = router.match('/order/32');
console.log("viewMatch", viewMatch);
console.log("param", viewMatch.param);
console.log("label", viewMatch.node.label);

let noMatch = router.match('/noMatch/32');
console.log("noMatch", noMatch);
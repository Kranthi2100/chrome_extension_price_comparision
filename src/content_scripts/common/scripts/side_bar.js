const SidebarComponent = require('../../../common/scripts/components/side_bar');
const {get_coupons} = require('../../../common/scripts/misc/query');
const  CouponComponent = require('../../../common/scripts/components/coupon');
const ActionMenuComponent = require('../../../common/scripts/components/ActionMenu');

let Sidebar = {};

Sidebar.create = () => {
  let $html_body = document.getElementsByTagName('body')[0];
  let $box = create_new_div({class_name: 'cp-box'});
  let $sideBarParent = create_new_div({class_name: 'side-bar-parent'});
  $sideBarParent.innerHTML = SidebarComponent.init();
  $html_body.insertBefore($box, document.body.firstChild);
  $box.appendChild($sideBarParent);
  Sidebar.create_menu();
  Sidebar.hideAction();
  //sidebar add listeners
  $sideBarChild = document.getElementsByClassName('side-bar-child')[0];
  $sideBar = document.getElementsByClassName('side-bar')[0];
  // $sideBar.addEventListener('mouseenter', Sidebar.showAction)
  $sideBarChild.addEventListener('mouseleave', Sidebar.hideAction)
}

Sidebar.showAction = () => {
  $menu = document.getElementsByClassName('cp-side-bar-menu-parent')[0];
  $menu.style.filter = 'opacity(100)'
}

Sidebar.hideAction = () => {
  $menu = document.getElementsByClassName('cp-side-bar-menu-parent')[0];
  $menu.style.filter = 'opacity(0)'
}

const create_new_div = function({class_name}){
  const $item =  document.createElement('div');
  $item.setAttribute('class', `${class_name}`)
  return $item;
}

const create_triangle_wrapper = function({
    $$parent_selector,
    class_name,
    direction
  }){
  
  const $wraper = create_new_div({class_name});
  const $triangle = create_new_div({class_name: `cp-side-bar-menu-trangle-${direction}`});

  $wraper.appendChild($triangle);

  add_div({
    $$parent_selector,
    $$insert_before: '.side-bar',
    node: $wraper
  })
  return $wraper;
}

const add_div = function({$$parent_selector, $$insert_before, node}){
  const $parent = document.querySelectorAll($$parent_selector)[0];
  if($$insert_before){
    const $insert_before = document.querySelectorAll($$insert_before)[0];
    $parent.insertBefore(node, $insert_before);
  }
  else{
    $parent.appendChild(node);
  }
}

Sidebar.create_menu = async function(){
  $node = create_triangle_wrapper({
    $$parent_selector: '.side-bar-child',
    class_name: 'cp-side-bar-menu-parent', 
    direction: 'right'
  });
  $item = create_new_div({class_name: 'cp-side-bar-menu'});
  add_div({
    $$parent_selector: '.cp-side-bar-menu-parent',
    node: $item
  })
  $item.innerHTML = '';
  ActionMenu.init();
}

const ActionMenu = {};

const add_listener = function(selector, type, fn){
  const $icon = document.querySelectorAll(selector)[0];
  $icon.addEventListener(type, fn);
} 

ActionMenu.coupons = () => {
  let [cacheCoupons, cacheDeals, flag] = ['', '', false];
  const init = async () => {
    if( !flag ){
      const {coupons, offers} = await get_coupons();
      if(coupons || offers) flag = true;
      [cacheCoupons, cacheDeals] = ['', ''];
      console.log(coupons[0]);
      coupons.forEach( c => {
        cacheCoupons += ActionMenuComponent.coupons(c);
      })

      offers.forEach( o => {
        cacheDeals += ActionMenuComponent.offers(o);
      })
    }
  } 
  const paintCoupons = async () => {
    await init();
    const $menu = document.querySelectorAll('.cp-side-bar-menu')[0];
    $menu.innerHTML = cacheCoupons;
    let $coupons = document.querySelectorAll('.cp-side-bar-menu .coupon');
    $coupons.forEach($coupon => {
      $coupon.addEventListener('click', function(){
        let $text = document.createElement('textarea');
        $text.value = $coupon.id;
        $menu.appendChild($text);
        $text.select();
        document.execCommand('copy');
        $menu.removeChild($text);
        $code = $coupon.getElementsByClassName('code')[0];
        $code.innerHTML = `${$coupon.id} - COPIED`;
      })
    })
    Sidebar.showAction();
  }
  
  const paintDeals = async () => {
    await init();
    const $menu = document.querySelectorAll('.cp-side-bar-menu')[0];
    $menu.innerHTML = cacheDeals;
    Sidebar.showAction();
  }

  add_listener('.side-bar .coupons', 'click', paintCoupons);
  add_listener('.side-bar .deals', 'click', paintDeals);
}

ActionMenu.graph = () => {
  let toggleGraph = () => {
    let $graph = document.getElementsByClassName('cp-graph')[0];
    $graph.style.display = ($graph.style.display === 'block') ? 'none' : 'block';
  }
  add_listener('.side-bar .history', 'click', toggleGraph);
}

ActionMenu.init = () => {
  ActionMenu.coupons();
  ActionMenu.graph();
}


module.exports = Sidebar;


var Main = {
  view: function(){
    return [m(".demo-layout.mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer.mdl-layout--fixed-header", {config:upgrade}, [
    		m("header.demo-header.mdl-layout__header.mdl-color--white.mdl-color--grey-100.mdl-color-text--grey-600", [
    			m(".mdl-layout__header-row", [
    				m("span.mdl-layout-title", "Curtain UI"),
    				m(".mdl-layout-spacer"),
    				m(".mdl-textfield.mdl-js-textfield.mdl-textfield--expandable", {config:upgrade}, [
    					m("label.mdl-button.mdl-js-button.mdl-button--icon[for='search']", [
    						m("i.material-icons", "search")
    					]),
    					m(".mdl-textfield__expandable-holder", [
    						m("input.mdl-textfield__input[id='search'][type='text']"),
    						m("label.mdl-textfield__label[for='search']", "Enter your query...")
    					])
    				]),
    				m("button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon[id='hdrbtn']", {config:upgrade}, [
    					m("i.material-icons", "more_vert")
    				]),
    				m("ul.mdl-menu.mdl-js-menu.mdl-js-ripple-effect.mdl-menu--bottom-right[for='hdrbtn']", {config:upgrade}, [
    					m("li.mdl-menu__item", { href:"/#/new", onclick: function( ) { m.route( '/' ); } }, "New Connection"),
    					m("li.mdl-menu__item", "postgres://postgres@localhost:5432/bazaar_v7"),
    					m("li.mdl-menu__item", "sqlite://memory")
    				])
    			])
    		]),
    		m(".demo-drawer.mdl-layout__drawer.mdl-color--blue-grey-900.mdl-color-text--blue-grey-50", [
    			m("header.demo-drawer-header", [
    				m("img.demo-avatar[src='images/database.png']"),
    				m(".demo-avatar-dropdown", [
    					m("span", "bazaar_v7"),
    					m(".mdl-layout-spacer"),
    					m("button.mdl-button.mdl-js-button.mdl-js-ripple-effect.mdl-button--icon[id='accbtn']", {config:upgrade}, [
    						m("i.material-icons[role='presentation']", "arrow_drop_down"),
    						m("span.visuallyhidden", "Accounts")
    					]),
    					m("ul.mdl-menu.mdl-menu--bottom-right.mdl-js-menu.mdl-js-ripple-effect[for='accbtn']", {config:upgrade}, [
    						m("li.mdl-menu__item", [m("i.material-icons", "add"),"New Connection"]),
    						m("li.mdl-menu__item", [m("i.material-icons", "forward"),"Disconnect"])
    					])
    				])
    			]),
    			m("nav.demo-navigation.mdl-navigation.mdl-color--blue-grey-800", [
            m.component(WindowList, {list:false}),
    				m(".mdl-layout-spacer"),
    				m("a.mdl-navigation__link", [m("i.mdl-color-text--blue-grey-400.material-icons[role='presentation']", "help_outline"),m("span.visuallyhidden", "Help")])
    			])
    		]),
    		m("main.mdl-layout__content.mdl-color--grey-100", [
    			   m(".mdl-grid.demo-content", {id:"content"})
    		])
    	])]
  }

}

var WindowList = {

  controller: function(arg){
    console.log("doing nothing here...",arg)
    return {list:Window.list()}
  },


  view: function(ctrl, arg){
    console.log("got", ctrl, arg);
    if (ctrl.list && ctrl.list()){
        return m("div",[
                  ctrl.list().map(function(window){
                  var table = window.table;
                  return m("a.mdl-navigation__link.mdl-js-ripple-effect", {href:"#window/"+table, onclick: function( ) { mx.route.go( 'WindowWidget', {table: table} ); } },
                            [m("i.mdl-color-text--blue-grey-400.material-icons[role='presentation']", "view_list"), window.name]
                          )
                }),
              ])
      }else{
        return m(".hidden")
      }
  }
}

var WindowWidget = {

  controller: function(arg){
    var table  = mx.route.param( 'table' );
    console.log("table:", table);
    console.log("Window widget arg: ", arg)
    var window = Window.table(table);
    return {table:table, window: window};

  },

  view: function(ctrl, arg){
    console.log("WindowWidget got..", ctrl, arg);
    console.log("window: ",ctrl.window())
    return m("h1", "WindowWidget");
  }
}

var About = {

  controller: function(){

  },

  view: function(){
    return m("h1", "About");
  }
}


var NewConnection = {

    controller: function(){

    },

    connect_to_server: function(element, isInitialized, context){
        if (!isInitialized){
            upgrade(element, isInitialized, context);
            element.onclick = function(e){
              console.log("connecting to server")
              e.preventDefault();
              NewConnection.set_db_url();
              m.route(element.getAttribute("href"))
            }
        }
    },


    set_db_url:function(){
      console.log("db_url:", db_url());
      sessionStorage.setItem('db_url', db_url());
    },

    view: function() {
        return m("div.center_form", [
                    m(".mdl-card.mdl-shadow--16dp",
                        [
                            m(".mdl-card__title",
                                m("h2.mdl-card__title-text", "Welcome")
                            ),
                            m(".mdl-card__supporting-text",
                                [
                                  m("table", {width:"100%"},
                                    [   m("tr",
                                            [m("td", m("label", "platform:")), m("td", m("input", {value: 'postgres'}))]
                                        ),
                                        m("tr",
                                               [m("td", m("label", "host:")), m("td", m("input", {value: 'localhost'}))]
                                         ),
                                        m("tr",
                                            [m("td", m("label", "port:")), m("td", m("input", {value: '5432'}))]
                                        ),
                                        m("tr",
                                            [m("td", m("label", "user:")), m("td", m("input", {value: 'postgres'}))]
                                        ),
                                        m("tr",
                                            [m("td", m("label", "password:")), m("td", m("input", {type:'password'}))]
                                        )
                                    ]
                                ),
                                m("p", "OR"),
                                m("div",
                                    [
                                      m(".mdl-textfield.mdl-js-textfield.mdl-textfield--floating-label", {config:upgrade},
                                      [
                                      		m("input.mdl-textfield__input", {type:"text", onchange: m.withAttr("value", db_url), value: db_url(), config:upgrade}),
                                      		m("label.mdl-textfield__label",{config:upgrade}, "DB url"),
                                      		m("span.mdl-textfield__error", "Unable to connect to db"),
                                  	   ])
                                    ]
                                ),
                              ]
                            ),
                            m(".mdl-card__actions",
                                [
                                    m(".mdl-grid", [
                                        m(".mdl-cell.mdl-cell--4-col", "\n"),
                                        m(".mdl-cell.mdl-cell--8-col", [
                                        m("a.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect", {href:'/', config:upgrade_and_route}, "Cancel"),
                                        m("a.mdl-button.mdl-button--raised.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent", {href:'/window', config:NewConnection.connect_to_server}, "Connect")
                                    ])])
                                ]
                            ),
                            m(".mdl-card__menu",
                                m("button.mdl-button.mdl-button--icon.mdl-js-button.mdl-js-ripple-effect", {config:upgrade},
                                    m("i.fa.fa-bars", "")
                                )
                            ),

                        ]
                    )
             ])
    }
}



var Findings = {

  view: function(){
    return m("h1", "Static Analysis Findings");
  }
}

var Dynamic = {

  view: function(){
    return m("h1", "Dyanmic Analysis");
  }
}

var Reports = {

  view: function(){
    return m("h1", "Dyanmic Analysis Reports");
  }
}

var app = {
    Main:       Main,
    WindowWidget:     WindowWidget,
    About: About,
    NewConnection: NewConnection,
}



mx.route( app , 'Main' , {
    'Main' : {
        place:      'body',
        module:     'Main'
     },
    'WindowWidget' : {
        url:        'window/:table',
        place:      '#content',
        module:     'WindowWidget'
     },
     'About' : {
         url:        'about',
         place:      '#content',
         module:     'About'
      },
      'NewConnection' : {
          url:        'new',
          place:      '#content',
          module:     'NewConnection'
       },


});

m.mount(document.body, Main); //Needed to mount it here to get away with ajax request weird issue

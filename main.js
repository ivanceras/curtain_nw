//m.route.mode = "pathname";
m.route.mode = "search";
//m.route.mode = "hash";

var api_endpoint = "http://localhost:7979";

var Error = {
    view: function(){
      return m("h5", "There was an error talking to the server")
    }
}

function display_error(){
    console.log("mounting error");
    m.mount(document.body, Error)
}

var Window = function(data) {
    data = data || {}
    this.table = m.prop(data.table)
    this.name = m.prop(data.name)
    this.description = m.prop(data.description)
}
Window.list = function() {
    return m.request({
            method: "GET",
            url: api_endpoint+"/window", //"window_list.json",
            unwrapError: function(response) {
                console.log("There was an error", response);
                display_error();
                return response;
            }
        })
}

/// whatever is the first window, will be used when no window is specified
Window.first = function(){
    return Window.list()
        .then(function(list){
                return Window.table(list[0].table)
            })
}

Window.table = function(table) {
    return m.request({
        method: "GET",
        url: api_endpoint+"/window/"+table //"window.json"
    })
}

var ListViewWindowWidget = {
    
    controller: function(){
        console.log("in List view window widget");
    },
    
    view: function(){
      return m.component(WindowWidget, {list_view:true})  
    }
}

var WindowWidget = {

    controller: function(arg){
        console.log("window widget arg: ", arg);
        var list_view = arg ? arg.list_view : false;
        return {list: Window.list(), list_view: list_view}
    },


    view: function(ctrl){
      return m(".mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer.mdl-layout--overlay-drawer-button.mdl-shadow--16dp",  {config: upgrade},
        [
           [m("header.mdl-layout__header", [
                m(".mdl-layout__header-row", [
                    m(".mdl-layout-spacer"),
                    m("nav.mdl-navigation", [
                        m("a.mdl-navigation__link[href='/']", {config: m.route}, "Home"),
                        m("a.mdl-navigation__link[href='/new']", {config: m.route}, "New connection"),
                        m("a.mdl-navigation__link[href='/dc']",{config: m.route}, "Disconnect"),
                    ])
                ])
            ])],
          m(".mdl-layout__drawer",
            [
              m("span.mdl-layout-title", "Tables"),
              m("nav.mdl-navigation",
                  [
                    ctrl.list().map(function(window){
                        return m("a", {class:'mdl-navigation__link', href: "/window/"+window.table, config:m.route}, window.name)
                    })
                  ]
              )
            ]
          ),
          m("main.mdl-layout__content", m.component(WindowDetail, {list_view:ctrl.list_view}))
        ]);
    },



}



var Home = {
    view: function() {
        return m("html",
                [
                    m("h3", "Home"),
                    m("a", {href:"/window", config:m.route}, "Go to windows"),
                    m("br"),
                    m("a", {href:"/new", config:m.route}, "Connect to a server")
                ]);
    }
}



var NewConnection = {

    view: function() {
        return [
                    m(".mdl-card.mdl-shadow--16dp",
                        [
                            m(".mdl-card__title",
                                m("h2.mdl-card__title-text", "Welcome")
                            ),
                            m(".mdl-card__supporting-text",
                                m("table",
                                    [   m("tr",
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
                                )
                            ),
                            m(".mdl-card__actions.mdl-card--border",
                                [
                                    m(".mdl-grid", [
                                        m(".mdl-cell.mdl-cell--4-col", "\n"),
                                        m(".mdl-cell.mdl-cell--8-col", [
                                        m("a.mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect", {href:'/', config:upgrade_and_route}, "Cancel"),
                                        m("a.mdl-button.mdl-button--raised.mdl-js-button.mdl-js-ripple-effect.mdl-button--accent", {href:'/window', config:upgrade_and_route}, "Connect")
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
             ]
    }
}

var Disconnect = {

    controller: function(){
        console.log("disconnecting...");
        m.route("/");
    }

}

m.route(document.body, "/", {
    "/": Home,
    "/new": NewConnection,
    "/dc": Disconnect,
    "/window": WindowWidget,
    "/window/:table": WindowWidget,
    "/window/:table/list/": ListViewWindowWidget, //list view
    "/window/:table/list/:record_id": WindowWidget, //list view with focused record
    "/window/:table/detail/": WindowWidget, //single row view
    "/window/:table/detail/:record_id": WindowWidget, //single row view with focused record

});

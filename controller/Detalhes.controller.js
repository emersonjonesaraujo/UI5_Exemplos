sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("ns.Prod2.controller.Detalhes", {
			onInit: function () {
                this._oRout = this.getOwnerComponent().getRouter();
                var oRouter =  sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detalhes").attachMatched(this._onRoute, this); 
                

            },
		_onRoute: function (evt) {

				var oArgs = evt.getParameter("arguments");
				var oView = this.getView();

				var sURL = "/Products(" + oArgs.idProd + ")";

				oView.bindElement({
					path: sURL,
					parameters: {
						expand:  "Category"
					},
					events: {
						dataRequested: function () {
							oView.setBusy(true);
						},
						dataReceived: function () {
							oView.setBusy(false);
						}
					}
				});

        },
		onBeforeRendering: function() {
				this.getView().byId("form0").bindElement("Supplier");
        },
        onNavBack: function(){
                this._oRout.navTo("default");        
        } ,

       openOrdemInfo: function(oEvent){
            var t = this.getView(); 
            if(!this._oDialog){
                this._oDialog = sap.ui.xmlfragment("ns.Prod2.view.OrdemInfo",this);
                this.getView().addDependent(this._oDialog);
            };
        
            var oOrder = oEvent.getSource().getBindingContext().getObject().OrderID; 
            var oProduto = oEvent.getSource().getBindingContext().getObject().ProductID; 
            
            var sURL = "/Order_Details(OrderID=" + oOrder + ",ProductID=" + oProduto + ")"; 
            
            var oForm = sap.ui.getCore().byId("sfInfo") 
            
            oForm.bindElement({ 
                    path: sURL,
                    parameters: {
                        expand: "Order"
                    },
                    events: {
                        dataRequested: function () {
                            t.setBusy(true);
                        },
                        dataReceived: function (response) {
                            t.setBusy(false);
                        }
                    }
                });        
            this._oDialog.open();
        },    
    
        onClose: function(){
            this._oDialog.close();
        }

	});
});

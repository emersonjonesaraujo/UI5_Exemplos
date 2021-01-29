sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/Sorter"
             
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,Filter,FilterOperator,Sorter) {
		"use strict";

		return Controller.extend("ns.Prod2.controller.View1", {
			onInit: function () {

            },
    	    funcListItemPress: function (evt) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var selectedIdProd = evt.getSource().getBindingContext().getProperty("ProductID") ;
				oRouter.navTo("Detalhes", {
					idProd: selectedIdProd
                });

            },
            
            onFilter: function (oEvent) {
               var query = oEvent.getSource().getValue();
               var oFilter = [];
                oFilter.push(new Filter("ProductName",FilterOperator.Contains,query));
               var oTable = this.getView().byId("table0");
               var bindign = oTable.getBinding("items");
               bindign.filter(oFilter);              
            },

         Price: function(oContext){
            var price = oContext.getProperty("UnitPrice");
            var key = "";
            var text = "";
            if(price <= 100){
                key="<";
                text="Menor ou igual a 100,00 BRL";
            }else if(price <= 1000){
                key="";
                text="Preço entre a 100,00 BRL e 1000,00 BRL";
            }else{
                key=">";
                text="Maior que  1000,00 BRL";
            }
            return{
                key: key,
                text: text
            };
        },   

        handlerGroup: function(evt){
            var sorters = [];
            var item = evt.getParameter("selectedItem");
            var key = (item)? item.getKey():null;
            
            if(key=== "UnitPrice"){ 
                var grouper = this.getView().getController().Price; 
                sorters.push(new Sorter(key,true,grouper)); 
            }else{ 
                sorters.push(new Sorter("Category/CategoryName",false,false));
                sorters.push(new Sorter("ProductName",false,false));
            }
            
            var oTable = this.getView().byId("table0");
            var oBinding = oTable.getBinding("items");
            oBinding.sort(sorters);
        },    
    
        });
        
	});

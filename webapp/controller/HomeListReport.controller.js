sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.build.leonardo.consignmentInventoryTrack.controller.HomeListReport", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.build.leonardo.consignmentInventoryTrack.view.HomeListReport
		 */
		onInit: function () {
			
			//this.getView().byId("idAppControl").setMode("ShowHideMode");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			

		},
		
		onAfterRendering: function(){
			sap.ui.getCore().byId("application-BUILD-prototype-component---app--idAppControl").setMode("HideMode");
		},
		
		_onFioriListReportTableItemPress: function(){
			this.oRouter.navTo("CustomerHome");
		}

	});

});
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV'
], function (BaseController, MessageBox, Utilities, History, Export, ExportTypeCSV) {
	"use strict";

	return BaseController.extend("com.sap.build.leonardo.consignmentInventoryTrack.controller.InventoryStockViewOffice", {
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5c6dc14c108dd25bd597911b";

			var oParams = {};

			if (oEvent.mParameters.data.masterContext) {
				this.sContext = oEvent.mParameters.data.masterContext;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onPageNavButtonPress: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function (oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		applyFiltersAndSorters: function (sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("InventoryStockViewOffice").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function () {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function () {
								this.oRouter.navTo("", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

			var oView = this.getView(),
				oData = {},
				self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData[
				"sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6"
			] = {};

			oData[
				"sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6"
			]["data"] = [{
				"dim0": "Owned",
				"mea0": null,
				"mea1": "600",
				"Dimension1": null,
				"dim1": "Self",
				"__id": 0
			}, {
				"undefined": null,
				"dim0": "ConsignmentTo",
				"dim1": "Office - Nevada",
				"mea1": "100",
				"__id": 1
			}, {
				"undefined": null,
				"dim0": "ConsignmentTo",
				"dim1": "William hsaio",
				"mea1": "150",
				"__id": 2
			}, {
				"undefined": null,
				"dim0": "ConsignmentTo",
				"dim1": "Sven Kruppel",
				"mea1": "200",
				"__id": 3
			}, {
				"undefined": null,
				"dim0": "ConsignmentTo",
				"dim1": "Lehigh Valley Hospital",
				"mea1": "40",
				"__id": 4
			}];

			self.oBindingParameters[
				'sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6'
			] = {
				"path": "/sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData[
				"sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6"
			]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			var aDimensions = oView.byId(
				"sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6"
			).getDimensions();
			aDimensions.forEach(function (oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function () {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId(
				"sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6"
			);
			oChart.bindData(oBindingParameters[
				'sap_IconTabBar_Page_0-content-sap_chart_StackedColumnChart-1550853454797-u9wl71dp7d0oh9nxhftgurvm5_S5-v5qnkcdsccoumw1wa9iec48s6_S6'
			]);

		},
		onDataExport: sap.m.Table.prototype.exportData || function (oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				// Pass in the model created above
				models: this.getView().getModel(),

				// binding information for the rows aggregation
				rows: {
					path: "/MaterialSet"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Material",
					template: {
						content: "{Material}"
					}
				}, {
					name: "Sold To",
					template: {
						content: "{SoldTo}"
					}
				}, {
					name: "Ship To",
					template: {
						content: "{Ship To}"
					}
				}, {
					name: "Qunatity",
					template: {
						content: {
							parts: ["Quantity", "Unit", "Height", "DimUnit"],
							formatter: function (q, u) {
								return q + u;
							}
						}
						// "{Width} x {Depth} x {Height} {DimUnit}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function (oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function () {
				oExport.destroy();
			});
		}
	});
}, /* bExport= */ true);
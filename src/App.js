import React from "react";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import routes from "./js/Routes";
import DashboardIndexPage from "../src/Components/Dashboard/index";
import LandingPage from "./Components/Login/landingPage";
import RoughIndex from "./Components/Rough/RoughIndex";
import OfficeIndex from "./Components/Office/OfficeIndex";
import FactoryIndex from "./Components/Factory/FactoryIndex";
import OrderIndex from "./Components/Order/OrderIndex";
import PolishIndex from "./Components/Report/Polish/PolishIndex";
import PacketStatusIndex from "./Components/Report/PacketStatus/PacketIndex";
import TotalCostIndex from "./Components/Report/TotalCost/TotalCostIndes";
import SellerIndex from "./Components/Selling/Seller/SellerIndex";
import BuyerIndex from "./Components/Selling/Buyer/BuyerIndex";
import BrokerIndex from "./Components/Selling/Broker/BrokerIndex";
import CostModelIndex from "./Components/CostModel/CostModelIndex";
import SettingIndex from "./Components/Setting/SettingIndex";
import EmployeeIndex from "./Components/Employee/Employee/EmployeeIndex";
import SallaryModuleIndex from "./Components/Employee/Sallary/SalaryModule";

function App() {
  return (
    <BrowserRouter>
      <HashRouter>
        <Route exact path={routes.landingPage} component={LandingPage} />
        <Route path={routes.dashboard} component={DashboardIndexPage} />
        <Route path={routes.rough} component={RoughIndex} />
        <Route path={routes.office} component={OfficeIndex} />
        <Route path={routes.factory} component={FactoryIndex} />
        <Route path={routes.order} component={OrderIndex} />
        <Route path={routes.polishreport} component={PolishIndex} />
        <Route path={routes.packetreport} component={PacketStatusIndex} />
        <Route path={routes.costreport} component={TotalCostIndex} />
        <Route path={routes.seller} component={SellerIndex} />
        <Route path={routes.buyer} component={BuyerIndex} />
        <Route path={routes.broker} component={BrokerIndex} />
        <Route path={routes.employee} component={EmployeeIndex} />
        <Route path={routes.sallary} component={SallaryModuleIndex} />
        <Route path={routes.costMaster} component={CostModelIndex} />
        <Route path={routes.settingpage} component={SettingIndex} />

        {/* <Route path={routes.dashboard} component={Home} />
        <Route path={routes.charity} component={Income} />
        <Route path={routes.expences} component={Expences} />
        <Route path={routes.cheques} component={Cheques} />
        <Route path={routes.animal} component={Animal} />
        <Route path={routes.employees} component={Employees} />
        <Route path={routes.notes} component={Notes} />
        <Route path={routes.trustmembers} component={TrustMembers} />
        <Route path={routes.settingpage} component={SettingPage} /> */}
      </HashRouter>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import { useHistory } from "react-router";
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  // SideNavMenu,
} from "carbon-components-react/lib/components/UIShell";
import {
  Dashboard32,
  ChartRadar32,
  Portfolio32,
  Industry32,
  TextMining32,
  Report32,
  HeatMap32,
  DataRefinery32,
  Model32,
  SaveModel32,
  FlaggingTaxi32,
  WatsonHealthCrossReference32,
  UserProfileAlt32,
  Event32,
  Product32,
  Settings32,
  ChevronDown32,
  UserProfile32,
  Money32,
} from "@carbon/icons-react";
import { withRouter } from "react-router";
import routes from "../../js/Routes";
import { Link, NavLink } from "react-router-dom";
import PageTopSection from "./PageTopSection";
// import Datasheet from "../Office/DataSheet";

const Sidebar = (props) => {
 const history = useHistory()
  const [reportCollaps, setReport] = useState(
    props.location.pathname.split("/")[2] === "Report" ? true : false
  );
  const [sellingCollaps, setselling] = useState(
    props.location.pathname.split("/")[2] === "Selling" ? true : false
  );
  const [employeeCollaps, setEmployees] = useState(
    props.location.pathname.split("/")[2] === "Employees" ? true : false
  );
  const [OfficeCollaps, setOffice] = useState(
    props.location.pathname.split("/").includes("office") ? true : false
  );
  const [factoryCollaps, setFactory] = useState(
    props.location.pathname.split("/").includes("factory")? true : false
  );
  console.log('factoryCollaps', factoryCollaps,props.location.pathname.split("/").includes(""))
  const NevigationArray = [
    { iconName: <Dashboard32 />, name: "Dashboard", url: routes.dashboard },
    { iconName: <ChartRadar32 />, name: "Rough", url: routes.rough },
    {
      dropdown: "yes",
      iconName: <Portfolio32 />,
      name: "Office",
      collaps: OfficeCollaps,
      innerNevigation: [
        { iconName: <Portfolio32 />, name: "Office-Table", url: routes.office },
        { iconName: <Report32 />, name: "Office-Sheet", url: routes.officedatasheet },
      ],
      extraRoute : ["/office/subpacket"]
    },
    {
      dropdown: "yes",
      iconName: <Industry32 />,
      name: "Factory",
      collaps: factoryCollaps,
      innerNevigation: [
        { iconName: <Industry32 />, name: "Factory-Table", url: routes.factory },
        { iconName: <Report32 />, name: "DataSheet", url: routes.factorydatasheet },
      ],
      extraRoute : ["/factory/subpacket"]
    },
    { iconName: <TextMining32 />, name: "Order Summary", url: routes.order },
    {
      dropdown: "yes",
      iconName: <Report32 />,
      name: "Report",
      collaps: reportCollaps,
      innerNevigation: [
        { iconName: <HeatMap32 />, name: "Polish", url: routes.polishreport },
        {
          iconName: <DataRefinery32 />,
          name: "Packet Status",
          url: routes.packetreport,
        },
        { iconName: <Model32 />, name: "Total Cost", url: routes.costreport },
      ],
    },
    {
      dropdown: "yes",
      iconName: <SaveModel32 />,
      name: "Selling",
      collaps: sellingCollaps,
      innerNevigation: [
        { iconName: <FlaggingTaxi32 />, name: "Seller", url: routes.seller },
        {
          iconName: <WatsonHealthCrossReference32 />,
          name: "Buyer",
          url: routes.buyer,
        },
        { iconName: <UserProfileAlt32 />, name: "Broker", url: routes.broker },
      ],
    },
    {
      dropdown: "yes",
      iconName: <Event32 />,
      name: "Employees",
      collaps: employeeCollaps,
      innerNevigation: [
        { iconName: <UserProfile32 />, name: "Employee", url: routes.employee },
        { iconName: <Money32 />, name: "Salary", url: routes.sallary },
      ],
    },
    { iconName: <Product32 />, name: "Cost Master", url: routes.costMaster },
    { iconName: <Settings32 />, name: "Setting", url: routes.settingpage },
  ];

  const onCollapsClick = (name) => {
    console.log("onCollapsClick -> name", name);
    if (name === "Report") {
      setReport(!reportCollaps);
    } else if (name === "Selling") {
      setselling(!sellingCollaps);
    } else if (name === "Employees"){
      setEmployees(!employeeCollaps);
    } else if (name === "Office"){
      setOffice(!OfficeCollaps);
    } else if (name === "Factory"){
      setFactory(!factoryCollaps);
    }
  };

  return (
    <div className="container">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="IBM Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName prefix="Diamond ERP">[Platform]</HeaderName>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={() => { }}
                >
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="App Switcher"
                  onClick={() => { }}
                >
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
            <div className={props.modelSheet && "modelComponent"}>
            <Content id="main-content">
              <div className="bx--grid">
                <div className="bx--row">
                  <section className="bx--offset-lg-3 bx--col-lg-13 sidebar-content">
                  { props.tab  ? 
                    (
                      // <Datasheet
                      //   data={props.data}
                      //   valueRenderer={props.valueRenderer}
                      //   onContextMenu={props.onContextMenu}
                      //   onCellsChanged={props.onCellsChanged}
                      //   tabContent={props.tab}
                      //   modelSheet={props.modelSheet}
                      // />
                      <div></div>

                    ) : (  

                    <div>
                      {props.table === "no" ? (
                        ""
                      ) : (
                        <PageTopSection
                          title={props.title}
                          button={props.button}
                          onClick={props.onClick}
                          handelAddData={props.addButtonFunction}
                          handleManageData={props.manageButtonFunction}
                          rowData={props.rowData}
                          column={props.column}
                          colour={props.colour}
                          edit={props.edit}
                          remove={props.remove}
                          tabview={props.tabview}
                          tabContent={props.tabContent}
                          pageSize={props.pageSize}
                          totalData={props.totalData}
                          cureentTab={props.cureentTab}
                          handelModelTabChange={props.handelModelTabChange}
                          tabSelected={props.tabSelected}
                        />
                      )}
                      {props.children}
                    </div>
                    )}
                  </section>
                </div>
              </div>
            </Content>
            </div>
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
              <SideNavItems>
                <div>
               
                  {NevigationArray.map((value, i) =>
                    value.dropdown ? (
                      <>
                        <div
                          className="sidebar_div_wrapper"
                          onClick={() => onCollapsClick(value.name)}
                          key={i}
                        >
                          {value.iconName}
                          <p>{value.name}</p>
                          <ChevronDown32
                            className={`collaps-arrow ${value.collaps ? "collaps-up-arrow" : ""
                              }`}
                            key={i}
                          />
                        </div>
                        {console.log('value.collaps', value)}
                        {value.collaps === true
                          ? value.innerNevigation.map((data) => (
                            <NavLink
                              to={data.url}
                              key={`${i}`}
                             
                              
                            >
                              {console.log('first',data.extraRoute,)}
                              <div
                                className={`sidebar_div_wrapper sub-menu-side-bar ${props.match.path === data.url
                                  ? "activate-menu"
                                  : props.match.path.includes(data.extraRoute) ? "activate-menu" : ""
                                  }`}
                              >
                                {data.iconName}
                                <p>{data.name}</p>
                              </div>
                            </NavLink>
                          ))
                          : ""}
                      </>
                    ) : (
                      <Link to={value.url} key={`${value}-${i}`}>
                        <div
                          className={`sidebar_div_wrapper ${props.match.path === value.url
                            ? "activate-menu"
                            : ""
                            }`}
                        >
                          {value.iconName}
                          <p>{value.name}</p>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </SideNavItems>
            </SideNav>
          </>
        )}
      />
    </div>
  );
};

export default withRouter(Sidebar);

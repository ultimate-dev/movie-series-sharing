import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
//Components
import * as Header from "./Header";
//Pages
const DashboardPage = React.lazy(() =>
  import("../../pages/panel/Dashboard/DashboardPage")
);
const DocumentationPage = React.lazy(() =>
  import("../../pages/panel/Documentation/DocumentationPage")
);
//Account
const AccountPage = React.lazy(() =>
  import("../../pages/panel/Account/AccountPage")
);
const SettingsPage = React.lazy(() =>
  import("../../pages/panel/Account/SettingsPage")
);
//Users
const UsersPage = React.lazy(() => import("../../pages/panel/Users/UsersPage"));
const UsersBanPage = React.lazy(() =>
  import("../../pages/panel/Users/UsersBanPage")
);
//OtherInfos
const OtherInfosPage = React.lazy(() =>
  import("../../pages/panel/OtherInfos/OtherInfosPage")
);
//Contact
const ContactPage = React.lazy(() =>
  import("../../pages/panel/Contact/ContactPage")
);
//Managers
const ManagersPage = React.lazy(() =>
  import("../../pages/panel/Managers/ManagersPage")
);
//Main - HomePage
const MainHomePage = React.lazy(() =>
  import("../../pages/panel/Mains/HomePage")
);
//Main - ActivityPage
const MainActivityPage = React.lazy(() =>
  import("../../pages/panel/Mains/ActivityPage")
);
//Main - AffiliatesPage
const MainAffiliatesPage = React.lazy(() =>
  import("../../pages/panel/Mains/AffiliatesPage")
);
//Main - SustainabilityPage
const MainSustainabilityPage = React.lazy(() =>
  import("../../pages/panel/Mains/SustainabilityPage")
);
//Main - Abouts - SarikTara
const MainAboutsSarikTara = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/SarikTara")
);
//Main - Abouts - CompanyProfile
const MainAboutsCompanyProfile = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/CompanyProfile")
);
//Main - Abouts - History
const MainAboutsHistory = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/History")
);
//Main - Abouts - News
const MainAboutsNews = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/News")
);
//Main - Abouts - CorporateCompanyPolicies
const MainAboutsCorporateCompanyPolicies = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/CorporateCompanyPolicies")
);
//Main - Abouts - MissionVisionValues
const MainAboutsMissionVisionValues = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/MissionVisionValues")
);
//Main - Abouts - Awards
const MainAboutsAwards = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/Awards")
);
//Main - Abouts - Offices
const MainAboutsOffices = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/Offices")
);
//Main - Abouts - Administration
const MainAboutsAdministration = React.lazy(() =>
  import("../../pages/panel/Mains/Abouts/Administration")
);

//Roots
const ErrorPage = React.lazy(() =>
  import("../../pages/roots/errors/ErrorPage")
);

export default function Routes() {
  const suffix = "/panel";

  const admin = useSelector((state) => state.userReducer.user);

  return (
    <Switch>
      {/**Routes */}
      <Route
        path={suffix + "/dashboard"}
        render={(props) => <DashboardPage {...props} Header={Header} />}
        exact
      />
      {/**Documentation */}
      <Route
        path={suffix + "/documentation"}
        render={(props) => <DocumentationPage {...props} Header={Header} />}
        exact
      />
      {/**ManagersPage */}
      {admin.status == 2 ? (
        <Route
          path={suffix + "/managers"}
          render={(props) => <ManagersPage {...props} Header={Header} />}
          exact
        />
      ) : null}
      {/**Account */}
      <Route
        path={suffix + "/account"}
        render={(props) => <AccountPage {...props} Header={Header} />}
        exact
      />
      <Route
        path={suffix + "/settings"}
        render={(props) => <SettingsPage {...props} Header={Header} />}
        exact
      />
      {/**Users */}
      <Route
        path={suffix + "/users/list"}
        render={(props) => <UsersPage {...props} Header={Header} />}
        exact
      />
      <Route
        path={suffix + "/users/ban"}
        render={(props) => <UsersBanPage {...props} Header={Header} />}
        exact
      />
      <Redirect from={suffix + "/users"} to={suffix + "/users/list"} exact />
      {/**OtherInfos */}
      <Route
        path={suffix + "/other-infos"}
        render={(props) => <OtherInfosPage {...props} Header={Header} />}
        exact
      />
      {/**ContactPage */}
      <Route
        path={suffix + "/contacts"}
        render={(props) => <ContactPage {...props} Header={Header} />}
        exact
      />
      {/**Mains*/}
      {/**Main - HomePage */}
      <Route
        path={suffix + "/mains/home"}
        render={(props) => <MainHomePage {...props} Header={Header} />}
        exact
      />
      {/**Main - ActivityPage */}
      <Route
        path={suffix + "/mains/activity"}
        render={(props) => <MainActivityPage {...props} Header={Header} />}
        exact
      />
      {/**Main - AffiliatesPage */}
      <Route
        path={suffix + "/mains/affiliates"}
        render={(props) => <MainAffiliatesPage {...props} Header={Header} />}
        exact
      />
      {/**Main - SustainabilityPage */}
      <Route
        path={suffix + "/mains/sustainability"}
        render={(props) => (
          <MainSustainabilityPage {...props} Header={Header} />
        )}
        exact
      />
      {/**Main - Abouts - SarikTara */}
      <Route
        path={suffix + "/mains/about/sarik-tara"}
        render={(props) => <MainAboutsSarikTara {...props} Header={Header} />}
        exact
      />
      {/**Main - Abouts - CompanyProfile */}
      <Route
        path={suffix + "/mains/about/company-profile"}
        render={(props) => (
          <MainAboutsCompanyProfile {...props} Header={Header} />
        )}
        exact
      />
      {/**Main - Abouts - History */}
      <Route
        path={suffix + "/mains/about/history"}
        render={(props) => <MainAboutsHistory {...props} Header={Header} />}
        exact
      />
      {/**Main - Abouts - News*/}
      <Route
        path={suffix + "/mains/about/news"}
        render={(props) => <MainAboutsNews {...props} Header={Header} />}
        exact
      />
      {/**Main - Abouts - CorporateCompanyPolicies*/}
      <Route
        path={suffix + "/mains/about/corporate-company-policies"}
        render={(props) => (
          <MainAboutsCorporateCompanyPolicies {...props} Header={Header} />
        )}
        exact
      />
      {/**Main - Abouts - MissionVisionValues */}
      <Route
        path={suffix + "/mains/about/mission-vision-values"}
        render={(props) => (
          <MainAboutsMissionVisionValues {...props} Header={Header} />
        )}
        exact
      />
      {/**Main - Abouts - Awards */}
      <Route
        path={suffix + "/mains/about/awards"}
        render={(props) => <MainAboutsAwards {...props} Header={Header} />}
        exact
      />
      {/**Main - Abouts - Offices */}
      <Route
        path={suffix + "/mains/about/offices"}
        render={(props) => <MainAboutsOffices {...props} Header={Header} />}
        exact
      />
      {/**Main - Abouts - Administration */}
      <Route
        path={suffix + "/mains/about/administration"}
        render={(props) => (
          <MainAboutsAdministration {...props} Header={Header} />
        )}
        exact
      />

      <Redirect from={suffix + "/mains"} to={suffix + "/mains/home"} exact />
      {/**Redirects */}
      <Redirect from={suffix + "/"} to={suffix + "/dashboard"} exact />
      {/**Roots */}
      <Route
        path={suffix + "/*"}
        render={(props) => (
          <ErrorPage
            code="404"
            label="Sayfa Bulunamadı"
            desc="Aradığınız Sayfaya Ulaşamıyoruz."
            {...props}
          />
        )}
        exact
      />
    </Switch>
  );
}

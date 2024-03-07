import React, { useState, useEffect } from "react";
import "./index.css";
import Info from "./component/Info/Info";
import Login from "./component/form/LoginForm";
import { Route, Routes } from "react-router-dom";
import Page404 from "./component/Page404/page404";
import Logo from "./assets/img/logonas.png";
import Mailer from "./component/Info/Mailer/Mailer";
import Settings from "./component/Settings/Settings";
import Billings from "./component/Billings/Billings";
import Bookings from "./component/Bookings/Bookings";
import Accounts from "./component/Accounts/Accounts";
// import Income from "./component/Billings/Income/Income";
import FuelInfo from "./component/Info/FuelInfo/FuelInfo";
// import Expense from "./component/Billings/Expense/Expense";
import RateTypes from "./component/Info/RateTypes/RateTypes";
import Transfer from "./component/Billings/Transfer/Transfer";
import MainDash from "./component/Dashboard/MainDash/MainDash";
import Received from "./component/Bookings/Receiveds/Receiveds";
import Registration from "./component/Registration/Registration";
import UserSettings from "./component/UserSettings/UserSettings";
import TripSheet from "./component/Bookings/TripSheet/TripSheet";
import Employes from "./component/Registration/Employes/Employes";
import Customer from "./component/Registration/Customer/Customer";
import Suppliers from "./component/Registration/Supplier/Suppliers";
import OnlineBooking from "./component/OnlineBooking/OnlineBooking";
import Permission from "./component/Settings/Permission/Permission";
import UserSetting from "./component/UserSettings/UserInfo/UserInfo";
import BookingMain from "./component/Bookings/BookingMain/BookingMain";
import Dispatcheds from "./component/Bookings/Dispatcheds/Dispatcheds";
import MainSetting from "./component/Settings/MainSetting/MainSetting";
// import ProfiteLoss from "./component/Billings/ProfiteLoss/ProfiteLoss";
import BillingMain from "./component/Billings/billingMain/billingMain";
import CoveringBill from "./component/Billings/CoveringBill/CoveringBill";
import UserCreation from "./component/Settings/UserCreation/UserCreation";
import RateManagement from "./component/Info/RateManagement/RateManagement";
import DigitalSignature from "./component/DigitalSignature/DigitalSignature";
import MainDashboard from "./component/Dashboard/Maindashboard/MainDashboard";
import StationCreation from "./component/Settings/StationCreation/StationCreation";
import NavigationMap from "./component/Bookings/TripSheet/NavigationMap/MapComponent";
import OnlineLoginForm from "./component/OnlineBooking/OnlineLoginForm/OnlineLoginForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className={isLoading ? "loading-container" : ""}>
        {isLoading ? (
          <div className="loading-spinners">
            {/* <ThreeCircles color="#3d92f3" height={80} width={80} /> */}
            <div className="logo-loading">
              <img src={Logo} alt="logo" />
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<MainDashboard />}>
              <Route path="/home/dashboard" element={<MainDash />} />
              <Route path="/home/bookings" element={<Bookings />}>
                <Route
                  path="/home/bookings/booking"
                  element={<BookingMain />}
                />
                <Route
                  path="/home/bookings/tripsheet"
                  element={<TripSheet />}
                />
                <Route path="/home/bookings/received" element={<Received />} />
                <Route
                  path="/home/bookings/dispatched"
                  element={<Dispatcheds />}
                />
              </Route>
              <Route path="/home/registration" element={<Registration />}>
                <Route
                  path="/home/registration/customer"
                  element={<Customer />}
                />
                <Route
                  path="/home/registration/supplier"
                  element={<Suppliers />}
                />
                <Route
                  path="/home/registration/employes"
                  element={<Employes />}
                />
              </Route>
              <Route path="/home/info" element={<Info />}>
                <Route path="/home/info/ratetype" element={<RateTypes />} />
                <Route
                  path="/home/info/ratemanagement"
                  element={<RateManagement />}
                />
                <Route path="/home/info/mailer" element={<Mailer />} />
                <Route path="/home/info/fuelinfo" element={<FuelInfo />} />
              </Route>
              <Route path="/home/billing" element={<Billings />}>
                <Route path="/home/billing/billing" element={<BillingMain />} />
                <Route path="/home/billing/transfer" element={<Transfer />} />
                <Route
                  path="/home/billing/coveringbill"
                  element={<CoveringBill />}
                />
              </Route>
              <Route path="/home/accounts" element={<Accounts />}>
                {/* <Route path="/home/accounts/expense" element={<Expense />} />
                <Route path="/home/accounts/income" element={<Income />} />
                <Route path="/home/accounts/profitandloss" element={<ProfiteLoss />} /> */}
              </Route>
              <Route path="/home/settings" element={<Settings />}>
                <Route
                  path="/home/settings/usercreation"
                  element={<UserCreation />}
                />
                <Route
                  path="/home/settings/stationcreation"
                  element={<StationCreation />}
                />
                <Route
                  path="/home/settings/permission"
                  element={<Permission />}
                />
                <Route
                  path="/home/settings/mainsetting"
                  element={<MainSetting />}
                />
              </Route>
              <Route path="/home/usersettings" element={<UserSettings />}>
                <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                />
                <Route
                  path="/home/usersettings/usersetting"
                  element={<UserSetting />}
                />
              </Route>
            </Route>
            <Route path="/navigationmap" element={<NavigationMap />} />
            <Route path="/onlinelogin" element={<OnlineLoginForm />} />
            <Route path="/onlinebooking" element={<OnlineBooking />} />
            <Route
              path="/onlinedigital/digitalsignature"
              element={<DigitalSignature />}
            />
            <Route
              path="*"
              element={
                <main className="page404main">
                  <Page404 />
                </main>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;

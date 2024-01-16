import AccountSettings from "../../components/Account/AccountSettings";
import "./GettingStartedPage.scss";

export default function GettingStartedPage({ setUser }) {
  return (
    // <div className="glass account-settings-container">
      <AccountSettings setUser={setUser} />

  );
}

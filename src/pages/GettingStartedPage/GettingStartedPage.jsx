import AccountSettings from "../../components/Account/AccountSettings";

export default function GettingStartedPage({ setUser }) {
  return (
    <div className="glass">
      <AccountSettings setUser={setUser} />
    </div>
  );
}

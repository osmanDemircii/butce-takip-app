import UserInfo from "../components/profile/UserInfo";
import SettingsMenu from "../components/profile/SettingsMenu";
import "../styles/profilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1 className="profile-page__title">Profil</h1>
        <p className="profile-page__sub">Hesap ve tercihler</p>
      </div>

      <UserInfo />
      <SettingsMenu />
    </div>
  );
};

export default ProfilePage;
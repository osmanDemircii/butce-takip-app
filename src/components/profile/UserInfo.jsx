import { useAuth } from "../../context/AuthContext";
import { MONTHS_TR } from "../../utils/formatDate";
import "../../styles/userInfo.css";

const UserInfo = () => {
  const { currentUser } = useAuth();

  const joinDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime)
    : null;

  const joinText = joinDate
    ? `${joinDate.getDate()} ${MONTHS_TR[joinDate.getMonth()]} ${joinDate.getFullYear()}`
    : "—";

  const initials = currentUser?.displayName
    ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="user-info">
      {/* Avatar */}
      <div className="user-info__avatar">
        <span>{initials}</span>
      </div>

      {/* Bilgiler */}
      <div className="user-info__details">
        <h2 className="user-info__name">
          {currentUser?.displayName || "Kullanıcı"}
        </h2>
        <span className="user-info__email">{currentUser?.email}</span>
        <div className="user-info__badges-row">
          <span className="user-info__badge user-info__badge--admin">
            👑 Üye
          </span>
          <span className="user-info__badge user-info__badge--date">
            📅 {joinText}'den beri
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BattlePage from "../battle";

type Player = { email: string; [k: string]: any };
type MatchData = { roomID: string; players: Player[] };

const Battle = () => {
  const { roomID } = useParams<{ roomID: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const matchData = location.state as MatchData | null;

  useEffect(() => {
    if (!matchData || !matchData.players || !roomID) {
      navigate("/player/dashboard");
    }
  }, [matchData, navigate, roomID]);

  if (!matchData || !matchData.players || !roomID) return null;

  const players = matchData.players;
  const myEmail = localStorage.getItem("email");

  let you = players[0];
  let opponent = players[1];

  if (myEmail && players.length === 2) {
    if (players[0].email === myEmail) {
      you = players[0];
      opponent = players[1];
    } else {
      you = players[1];
      opponent = players[0];
    }
  }

  return (
    <BattlePage roomID={roomID} you={you} opponent={opponent} />
  );
};

export default Battle;

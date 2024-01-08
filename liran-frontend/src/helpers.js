import TopicIcon from "@mui/icons-material/Topic";
import DevicesIcon from "@mui/icons-material/Devices";
import FactoryIcon from "@mui/icons-material/Factory";
import StorageIcon from "@mui/icons-material/Storage";
import ExtensionIcon from "@mui/icons-material/Extension";
import PasswordIcon from "@mui/icons-material/Password";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EngineeringIcon from "@mui/icons-material/Engineering";

export function getIconForAppbar(place) {
  let icon;
  switch (place) {
    case 0:
      icon = <TopicIcon sx={{ color: "#3B3486" }} />;
      break;
    case 1:
      icon = <DevicesIcon sx={{ color: "#3B3486" }} />;
      break;
    case 2:
      icon = <FactoryIcon sx={{ color: "#3B3486" }} />;
      break;
    case 3:
      icon = <StorageIcon sx={{ color: "#3B3486" }} />;
      break;
    case 4:
      icon = <ExtensionIcon sx={{ color: "#3B3486" }} />;
      break;
    case 5:
      icon = <PasswordIcon sx={{ color: "#3B3486" }} />;
      break;
    case 6:
      icon = <SettingsSuggestIcon sx={{ color: "#3B3486" }} />;
      break;
    case 7:
      icon = <EngineeringIcon sx={{ color: "#3B3486" }} />;
      break;
  }
  return icon;
}

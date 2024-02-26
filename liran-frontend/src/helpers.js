import axios from "axios";

import HomeIcon from "@mui/icons-material/Home";
import TopicIcon from "@mui/icons-material/Topic";
import DevicesIcon from "@mui/icons-material/Devices";
import FactoryIcon from "@mui/icons-material/Factory";
import StorageIcon from "@mui/icons-material/Storage";
import ExtensionIcon from "@mui/icons-material/Extension";
import PasswordIcon from "@mui/icons-material/Password";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LogoutIcon from "@mui/icons-material/Logout";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

export async function loginFunc(url) {
  try {
    const result = await axios.get(url, { withCredentials: true }, headers);
    return result.data;
  } catch (error) {}
}

export function getIconForAppbar(place) {
  let icon;
  switch (place) {
    case 0:
      icon = <HomeIcon sx={{ color: "#3B3486" }} />;
      break;
    case 1:
      icon = <TopicIcon sx={{ color: "#3B3486" }} />;
      break;
    case 2:
      icon = <DevicesIcon sx={{ color: "#3B3486" }} />;
      break;
    case 3:
      icon = <FactoryIcon sx={{ color: "#3B3486" }} />;
      break;
    case 4:
      icon = <StorageIcon sx={{ color: "#3B3486" }} />;
      break;
    case 5:
      icon = <ExtensionIcon sx={{ color: "#3B3486" }} />;
      break;
    case 6:
      icon = <PasswordIcon sx={{ color: "#3B3486" }} />;
      break;
    case 7:
      icon = <SettingsSuggestIcon sx={{ color: "#3B3486" }} />;
      break;
    case 8:
      icon = <EngineeringIcon sx={{ color: "#3B3486" }} />;
      break;
    case 9:
      icon = <LogoutIcon sx={{ color: "#3B3486" }} />;
      break;
  }
  return icon;
}

export const getData = async (url) => {
  try {
    const result = await axios.get(url, { withCredentials: true }, headers);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createData = async (url, newItem) => {
  try {
    await axios.post(
      url,
      { new_item: newItem },
      { withCredentials: true },
      headers
    );
  } catch (error) {
    throw error;
  }
};

export const updateData = async (url, updatedItem) => {
  try {
    await axios.patch(
      url,
      { updated_item: updatedItem },
      { withCredentials: true },
      headers
    );
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    // when Flask is the backend server, axios.delete should not take headers!
    await axios.delete(url, { withCredentials: true });
  } catch (error) {
    throw error;
  }
};

export function validate(name, value, validationRules, setIsSaveBtnDisabled) {
  const isRequired = validationRules[name].required;
  const hasMin = validationRules[name].min;
  const hasMax = validationRules[name].max !== null;
  const hasViki = validationRules[name].viki;

  if (isRequired && value === "") {
    validationRules[name].error = true;
    validationRules[name].errorMessage = `Required field`;
    setIsSaveBtnDisabled(true);
    return;
  }

  if (hasMin) {
    if (+value < validationRules[name].min) {
      validationRules[name].error = true;
      validationRules[
        name
      ].errorMessage = `Can't be less than ${validationRules[name].min}`;
      setIsSaveBtnDisabled(true);
      return;
    } else {
      validationRules[name].error = false;
      validationRules[name].errorMessage = ``;
      setIsSaveBtnDisabled(false);
    }
  }

  if (hasMax) {
    if (+value > validationRules[name].max) {
      validationRules[name].error = true;
      validationRules[
        name
      ].errorMessage = `Can't be more than ${validationRules[name].max}`;
      setIsSaveBtnDisabled(true);
      return;
    } else {
      validationRules[name].error = false;
      validationRules[name].errorMessage = ``;
      setIsSaveBtnDisabled(false);
    }
  }

  if (hasViki) {
    if (+value % validationRules[name].viki === 0) {
      validationRules[name].error = true;
      validationRules[
        name
      ].errorMessage = `${name} can't be divided by ${validationRules[name].viki} without remainder`;
      setIsSaveBtnDisabled(true);
      return;
    } else {
      validationRules[name].error = false;
      validationRules[name].errorMessage = ``;
      setIsSaveBtnDisabled(false);
    }
  }
}

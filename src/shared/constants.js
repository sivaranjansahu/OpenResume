const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((m) => {
  return { key: m, value: m };
});
module.exports = {
  channels: {
    GET_DATA: "get_data",
    SET_PROFILE_DATA: "set_profile_data",
    GET_ALL_PROFILES: "get_all_profiles",
    GET_PROFILE: "get_profile",
    CREATE_PROFILE: "create_profile",
    DELETE_PROFILE: "delete_profile",
  },
  months: months,
};

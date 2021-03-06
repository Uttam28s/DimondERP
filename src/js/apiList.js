export const apiList = {
  income: { method: "POST", url: "income/add" },
};

export const Rough = {
  addRough: { method: "POST", url: "/rough/create" },
  getRough: { method: "GET", url: "/rough/view" },
  getRoughPrefrence: { method: "GET", url: "/common/getList" },
  getSortingData: { method: "GET", url: "/rough/sorting/view" },
  addSortingData: { method: "POST", url: "/rough/sorting/create" },
};

export const Office = {
  assignOffice: { method: "POST", url: "/office/create" },
  getOffice: { method: "GET", url: "/office/view" },
  getSubOffice: { method: "GET", url: "/office/subpacket/view" },
  getOfficeSr: { method: "GET", url: "/common/getOfficeSrNo" },
  createOfficePacket: { method: "POST", url: "/office/create/packet" },
  returnOfficePacket: { method: "POST", url: "/office/return" },
  unusedList: {method: "GET", url: "/common/unused"}
  // getRough: { method: "GET", url: "/rough/view" },
  // getRoughPrefrence: { method: "GET", url: "/common/getList" },
  // getSortingData: { method: "GET", url: "/rough/sorting/view" },
  // addSortingData: { method: "POST", url: "/rough/sorting/create" },
};

// export const addQueryID = (url, id) => `${url}/${id}`;

export const Factory = {
  assignFactory: {method: "POST", url: "/factory/create"},
  getFactoryList: {method: "GET", url: "/factory/view"},
  getSubFactory: {method: "GET", url: "/factory/subpacket/view"},
  getFactorySr: {method: "GET", url: "/common/getfactorySrNo"},
  createFactoryPacket: {method: "POST", url: "/factory/create/packet"},
  returnFactoryPacket: {method: "POST", url: "/factory/return"},
  returnFactorySubPacket: {method: "POST", url: "/factory/subpacket/return"},
  unusedList: {method: "GET", url: "/common/unused"}
}
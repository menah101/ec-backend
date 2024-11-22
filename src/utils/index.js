"use strict";

const _ = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedNullObject = (obj) => {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const current = obj[key];

    if ([null, undefined].includes(current)) return;
    if (Array.isArray(current)) return;

    if (typeof current === "object") {
      result[key] = removeUndefinedNullObject(current);
      return;
    }

    result[key] = current;
  });

  return result;
};

const updateNestedObjectParser = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const res = updateNestedObjectParser(obj[key]);
      Object.keys(res).forEach((val) => {
        result[`${key}.${val}`] = res[val];
      });
    } else {
      result[key] = obj[key];
    }
  });

  return result;
};

module.exports = {
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedNullObject,
  updateNestedObjectParser,
};

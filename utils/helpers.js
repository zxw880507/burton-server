import { SegmentedMessage } from "sms-segments-calculator";

export const dataReformat = (arr) => {
  return arr.map((el) => ({
    id: el.ID,
    name: el.name,
    sizeId: el.variationSize.ID,
    size: el.variationSize.displayName,
    colorId: el.variationColor.ID,
    color: el.variationColor.displayName,
    available: el.status.available,
    addToCartLink: el.addToCartLink,
  }));
};

export const isAvailable = (arr) => {
  return arr.filter((el) => el.available);
};

export const productMapping = (arr) => {
  return arr.reduce((accu, curr) => {
    if (accu.color) {
      if (!accu.color.includes(curr.color)) {
        accu.color.push(curr.color);
      }
    }
    if (!accu.color) {
      accu.color = [curr.color];
    }

    if (accu.size) {
      if (!accu.size.includes(curr.size)) {
        accu.size.push(curr.size);
      }
    }
    if (!accu.size) {
      accu.size = [curr.size];
    }
    return accu;
  }, {});
};

export const sortDemand = (productArray, form) => {
  return Object.keys(form).reduce((accu, curr) => {
    const list = form[curr];
    let newArr = [];
    list.forEach((el) => {
      const filter = accu.filter((pt) => pt[curr] === el);
      newArr = newArr.concat(filter);
    });
    return newArr;
  }, productArray);
};

export const getMsgArray = (demand, maxChar) => {
  let newArr = [];
  let init = "您查询的商品已经补货，刚快去抢货:\n\n";
  let list = demand.reduce((accu, el, index) => {
    const { name, size, color, addToCartLink } = el;
    if (index && accu.length) {
      accu += "\n\n";
    }
    let part = `${name}\nsize: ${size}\ncolor: ${color}\naddToCartLink: https://www.burton.com${addToCartLink}.html`;

    let newAccu = accu + part;
    let GSMLength = new SegmentedMessage(newAccu).numberOfCharacters;
    if (GSMLength >= maxChar) {
      newArr.push(accu);
      return part;
    }
    return newAccu;
  }, init);
  newArr.push(list);
  return newArr;
};

export const restockQueryString = (item, pid) => {
  const { colorId, sizeId } = item;
  return `https://www.burton.com/on/demandware.store/Sites-Burton_NA-Site/en_CA/Product-Variation?dwvar_${pid}_variationColor=${colorId}&dwvar_${pid}_variationSize=${sizeId}&pid=${pid}&quantity=1`;
};

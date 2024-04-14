let str = 'this is a nice title';
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title.toLowerCase()
  return titleCase
    .split(' ')
    .map((word, i) => ((!exceptions.includes(word) || i === 0) ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
};
console.log(convertTitleCase(str));
console.log(convertTitleCase("the CATCHER in the RYE, but give in to me"));

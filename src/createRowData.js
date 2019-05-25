import faker from "faker";

function createFakeRow(index) {
  return {
    id: index,
    uuid:faker.random.uuid(),
    avatar: faker.image.avatar(),
    county: faker.address.county(),
    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.address.streetName(),
    status:faker.random.arrayElement(["Excluded","With SDR","To RightBound"]),
    last_engage_type:faker.random.arrayElement(["survey","click","open"]),
    substatus:faker.random.arrayElement(["By prospect","Irrelevant company","New","No response ","Other","In process","Try other contacts in company","Qualified lead","Deal closed"," Try next month","Try next quarter","Try next year"]),
    countryName: faker.address.country(),
    last_engage: faker.date.past(1).toLocaleDateString() + ' ' +faker.date.past(1).toLocaleTimeString() ,
    jobTitle: faker.name.jobTitle(),
    detail: faker.company.catchPhrase(),
    companyName: faker.company.companyName(0),
    jobArea: faker.name.jobArea(),
    jobType: faker.name.jobType(),
    last_comment:faker.random.alphaNumeric(40)
  };
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}

const states = require('../data/states');

function cleanUpMemberList(list) {
  return list.map((member) => {
    let newMember = {};
    Object.keys(member).forEach((key) => {
      newMember[key] = member[key][0];
    });

    newMember.full_state_name = abbrevToState(newMember.state);
    newMember.first_name_without_initial = getFirstNameWithoutInitial(newMember.first_name);
    return newMember;
  })
}

function abbrevToState(testCase) {
  for (let i = 0; i < states.length; i++) {
    if (!testCase || testCase === 'frames') {
      return '';
    }
    if (states[i].abbrev === testCase) {
      return states[i].name;
    }
  }
};

function getFirstNameWithoutInitial(nameWithInitial) {
  let spaceIndex = nameWithInitial.indexOf(' ');
  if (spaceIndex > -1) {
    let nameWithoutInitial = nameWithInitial.slice(0, spaceIndex);
    return nameWithoutInitial;
  } else {
    return nameWithInitial;
  }
}

function keyByState(list) {
  let membersByState = {};
  list.forEach((member) => {
    let state = member.state;
    if (membersByState[state] && membersByState[state].length) {
      membersByState[state].push(member);
    } else {
      membersByState[state] = [member];
    }
  });
  return membersByState;
}

module.exports = {
  cleanUpMemberList,
  keyByState
};
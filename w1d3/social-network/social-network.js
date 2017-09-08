function SocialNetwork(networkData) {
  this.data = networkData;

  this.getPersonById = function(personId) {
    return this.data[personId];
  };

  this.getPersonId = function(name) {
    for (var personId in this.data) {
      if(this.getPersonById(personId).name === name) {
        return personId;
      }
    }
  };

  this.getPersonName = function(personId) {
    return this.getPersonById(personId).name;
  };

  this.getFollowerIds = function(personId, filter = function() { return true; }) {
    var followers = [];
    for (var otherPersonId in this.data) {
      for (var followId of this.getPersonById(otherPersonId).follows) {
        if(followId === personId && filter(personId)) {
          followers.push(otherPersonId);
          break;
        }
      }
    }
    return followers;
  };

  this.getPeopleFollowedIds = function(personId, filter = function() { return true; }) {
    return this.getPersonById(personId).follows.filter(filter);
  };

  this.getPeopleFollowedNames = function(personId, filter = function() { return true; }) {
    return this.getFollowerIds(personId, filter).map(this.getPersonName.bind(this));
  };

  this.getFollowerNames = function(personId, filter = function() { return true; }) {
    return this.getPeopleFollowedIds(personId, filter).map(this.getPersonName.bind(this));
  };

  this.printConnectionList = function() {
    for (var personId in this.data) {
      console.log(this.getPersonName(personId) + ':');
      var followsList = this.getFollowerNames(personId).join(', ');
      console.log(` - Follows ${followsList ? followsList : 'no one'}`);
      var followersList = this.getPeopleFollowedNames(personId).join(', ');
      console.log(` - Followed by ${followersList ? followersList : 'no one'}`);
    }
  };

  this.printMostFollowedPeople = function(filter = function() { return true; }, filterDesc = '') {
    var max = { names : [], follows : 0 };
    for (var personId in this.data) {
      var numFollows = this.getPeopleFollowedIds(personId, filter).length;
      if (numFollows > max.follows) {
        max.names = [this.getPersonName(personId)];
        max.follows = numFollows;
      } else if (numFollows === max.follows) {
        max.names.push(this.getPersonName(personId));
      }
    }
    console.log(`${max.names.join(', ')} ${max.names.length > 1 ? 'follow' : 'follows'} the most people ${filterDesc}(${max.follows})`);
  };

  this.printMostFollowers = function(filter = function() { return true; }, filterDesc = '') {
    var max = { names : [], followers : 0 };
    for (var personId in this.data) {
      var numFollowers = this.getFollowerIds(personId, filter).length;
      if (numFollowers > max.followers) {
        max.names = [this.getPersonName(personId)];
        max.followers = numFollowers;
      } else if (numFollowers === max.followers) {
        max.names.push(this.getPersonName(personId));
      }
    }
    console.log(`${max.names.join(', ')} ${max.names.length > 1 ? 'have' : 'has'} the most followers ${filterDesc}(${max.followers})`);
  };

  this.getPersonReach = function (personId, filter = function() { return true; }) {
    var followers = this.getFollowerIds(personId).filter(filter);
    for (var i in followers) {
      var followerId = followers[i];
      var theirFollowers = this.getFollowerIds(followerId).filter(filter);
      followers = followers.concat(theirFollowers);
    }
    var uniqueFollowers = [...new Set(followers)];

    if(uniqueFollowers.indexOf(personId) != -1) {
      return uniqueFollowers.length - 1;
    }
    return uniqueFollowers.length;
  };

  this.printReachList = function(filter = function() { return true; }, filterDesc = '') {
    for (var personId in this.data) {
      var name = this.getPersonName(personId);
      var reach = this.getPersonReach(personId, filter);
      console.log(`${name} reaches ${reach} people ${filterDesc}`);
    }
  };

  this.getPersonAge = function(personId) {
    var person = this.getPersonById(personId);
    return person.age;
  };

  this.printOneWayFollows = function() {
    var people = [];
    for (var personId in this.data) {
      var follows = this.getPeopleFollowedIds(personId);
      for (var followId of follows) {
        var theirFollows = this.getPeopleFollowedIds(followId);
        if (theirFollows.indexOf(personId) === -1) {
          people.push(this.getPersonName(personId));
          break;
        }
      }
    }
    console.log(`${people.join(', ')} follow someone who doesn't follow them`);
  };
};

var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  },
  f07: {
    name: "George",
    age: 70,
    follows: []
  }
};

var socialNetwork = new SocialNetwork(data);

socialNetwork.printConnectionList();
console.log('--------');
socialNetwork.printMostFollowers();
console.log('--------');
socialNetwork.printMostFollowedPeople();
console.log('--------');
socialNetwork.printReachList();
console.log('--------');
socialNetwork.printOneWayFollows();
console.log('--------');

var filterByAge = function (age, comparisonString) {
  var comparators = [...new Set(comparisonString.split(''))];

  var strategies = {
    '>' : (x) => x > age,
    '<' : (x) => x < age,
    '=' : (x) => x === age
  };

  return function (personId) {
    var personAge = socialNetwork.getPersonAge(personId);
    return comparators.some((c) => {
      var strategy = strategies[c];
      if(typeof strategy !== 'function') throw Error(`Invalid comparison character: ${c}`);
      return(strategy(personAge));
    });
  };
};

socialNetwork.printMostFollowers(filterByAge(30, '>'), 'over 30 ');
console.log('--------');
socialNetwork.printMostFollowedPeople(filterByAge(30, '>'), 'over 30 ');
console.log('--------');
socialNetwork.printReachList(filterByAge(30, '>'), 'over 30 ');
console.log('--------');

socialNetwork.printMostFollowedPeople(filterByAge(20, '<='), 'no older than 20 ');
console.log('--------');

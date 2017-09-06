var socialNetwork = {
  data : {
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
    }
  },

  getPersonById : function(personId) {
    return this.data[personId];
  },

  getPersonId : function(name) {
    for (var personId in this.data) {
      if(this.getPersonById(personId).name === name) {
        return personId;
      }
    }
  },

  getPersonName : function(personId) {
    return this.getPersonById(personId).name;
  },

  getFollowerIds : function(personId, filter = function() { return true; }) {
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
  },

  getPeopleFollowedIds : function(personId, filter = function() { return true; }) {
    return this.getPersonById(personId).follows.filter(filter);
  },

  getPeopleFollowedNames : function(personId, filter = function() { return true; }) {
    return this.getFollowerIds(personId, filter).map(this.getPersonName.bind(this));
  },

  getFollowerNames : function(personId, filter = function() { return true; }) {
    return this.getPeopleFollowedIds(personId, filter).map(this.getPersonName.bind(this));
  },

  printConnectionList : function() {
    for (var personId in this.data) {
      console.log(this.getPersonName(personId) + ':');
      var followsList = this.getFollowerNames(personId).join(', ');
      console.log(` - Follows ${followsList ? followsList : 'no one'}`);
      var followersList = this.getPeopleFollowedNames(personId).join(', ')
      console.log(` - Followed by ${followersList ? followersList : 'no one'}`);
    }
  },

  printMostFollowedPeople : function(filter = function() { return true; }, filterDesc = '') {
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
  },

  printMostFollowers : function(filter = function() { return true; }, filterDesc = '') {
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
  },

  getPersonReach : function (personId) {
    var followers = this.getFollowerIds(personId);
    for (var i in followers) {
      var followerId = followers[i];
      var theirFollowers = this.getFollowerIds(followerId);
      followers = followers.concat(theirFollowers);
    }
    var uniqueFollowers = [...new Set(followers)];
    return uniqueFollowers.length;
  },

  printReachList : function() {
    for (var personId in this.data) {
      var name = this.getPersonName(personId);
      var reach = this.getPersonReach(personId);
      console.log(`${name} has a reach of ${reach}`);
    }
  },

  filterOver30 : function(personId) {
    var person = this.getPersonById(personId);
    return person.age > 30;
  }
};

socialNetwork.printConnectionList();
console.log('--------');
socialNetwork.printMostFollowers();
console.log('--------');
socialNetwork.printMostFollowedPeople();
console.log('--------');
socialNetwork.printReachList();

// socialNetwork.printMostFollowers(socialNetwork.filterOver30, 'over 30 ');
// console.log('--------');
// socialNetwork.printMostFollowedPeople(socialNetwork.filterOver30, 'over 30 ');
// console.log('--------');

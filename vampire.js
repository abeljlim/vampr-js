class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numVampiresAway = 0;
    let currVamp = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currVamp.creator) {
      currVamp = currVamp.creator;
      numVampiresAway++;
    }

    return numVampiresAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // base case?
    if(this.name === name) {
      return this;
    }
    
    // recursive case?
    for(const childVamp of this.offspring) {
      if(childVamp.vampireWithName(name)) {
        return childVamp.vampireWithName(name);
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numDescendents = 0; // base case?

    // recursive case?
    for (const anOffspring of this.offspring) {
      numDescendents += 1 + anOffspring.totalDescendents;
    }

    return numDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = []; // base case?

    if(this.yearConverted > 1980) {
      millennials.push(this);
    }

    // recursive case?
    for (const anOffspring of this.offspring) {
      millennials = millennials.concat(anOffspring.allMillennialVampires);
    }

    return millennials;    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // equalize vampire distance from the original vampire in terms of number of ancestors
    // if equalizing results in either this or vampire being currVamp then return that vampire
    // once equal, start checking if the next ancestor is shared repeatedly and return the ancestor once a common parent is found
    const thisDistance = this.numberOfVampiresFromOriginal;
    const otherDistance = vampire.numberOfVampiresFromOriginal;
    let thisAncestVampToCompare = this;
    let otherAncestVampToCompare = vampire;
    if(thisDistance < otherDistance) {
      // traverse until the other ancestor vamp to compare is equalized in distance from the original
      for(let iter = 0; iter < otherDistance - thisDistance; iter++) {
        otherAncestVampToCompare = otherAncestVampToCompare.creator;
      }
    } else {
      for (let iter = 0; iter < thisDistance - otherDistance; iter++) {
        thisAncestVampToCompare = thisAncestVampToCompare.creator;
      }
    }

    // equalized at this point; now check if the object references match; if so, then return the vamp
    if(thisAncestVampToCompare === otherAncestVampToCompare) {
      return thisAncestVampToCompare;
    }

    // otherwise, continue checking for a matching ancestor
    while(thisAncestVampToCompare !== otherAncestVampToCompare) {
      thisAncestVampToCompare = thisAncestVampToCompare.creator;
      otherAncestVampToCompare = otherAncestVampToCompare.creator;
    }
    return thisAncestVampToCompare;
  }
}

module.exports = Vampire;


import Map "mo:core/Map";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type Artist = {
    id : Nat;
    name : Text;
    genre : Text;
    bio : Text;
    imageUrl : Text;
  };

  type Release = {
    id : Nat;
    title : Text;
    artistId : Nat;
    year : Nat;
    genre : Text;
  };

  type DomainActor = {
    id : Nat;
    name : Text;
    specialty : Text;
    bio : Text;
    imageUrl : Text;
  };

  module Artist {
    public func compare(a1 : Artist, a2 : Artist) : Order.Order {
      Nat.compare(a1.id, a2.id);
    };
  };

  module Release {
    public func compare(r1 : Release, r2 : Release) : Order.Order {
      Nat.compare(r1.id, r2.id);
    };
  };

  module DomainActor {
    public func compare(a1 : DomainActor, a2 : DomainActor) : Order.Order {
      Nat.compare(a1.id, a2.id);
    };
  };

  var nextArtistId = 1;
  var nextReleaseId = 1;
  var nextDomainActorId = 1;

  let artists = Map.empty<Nat, Artist>();
  let releases = Map.empty<Nat, Release>();
  let domainActors = Map.empty<Nat, DomainActor>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Artist CRUD
  public shared ({ caller }) func addArtist(name : Text, genre : Text, bio : Text, imageUrl : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add artists");
    };

    let artist : Artist = {
      id = nextArtistId;
      name;
      genre;
      bio;
      imageUrl;
    };

    artists.add(artist.id, artist);
    nextArtistId += 1;
    artist.id;
  };

  public shared ({ caller }) func updateArtist(id : Nat, name : Text, genre : Text, bio : Text, imageUrl : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update artists");
    };

    switch (artists.get(id)) {
      case (null) { Runtime.trap("Artist not found") };
      case (?_) {
        let updatedArtist : Artist = {
          id;
          name;
          genre;
          bio;
          imageUrl;
        };
        artists.add(id, updatedArtist);
      };
    };
  };

  public shared ({ caller }) func deleteArtist(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete artists");
    };

    if (not artists.containsKey(id)) {
      Runtime.trap("Artist not found");
    };
    artists.remove(id);
  };

  public query func getArtist(_id : Nat) : async ?Artist {
    artists.get(_id);
  };

  public query func listArtists() : async [Artist] {
    artists.values().toArray().sort();
  };

  // Release CRUD
  public shared ({ caller }) func addRelease(title : Text, artistId : Nat, year : Nat, genre : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add releases");
    };

    switch (artists.get(artistId)) {
      case (null) { Runtime.trap("Artist not found") };
      case (?_) {
        let release : Release = {
          id = nextReleaseId;
          title;
          artistId;
          year;
          genre;
        };

        releases.add(release.id, release);
        nextReleaseId += 1;
        release.id;
      };
    };
  };

  public shared ({ caller }) func updateRelease(id : Nat, title : Text, artistId : Nat, year : Nat, genre : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update releases");
    };

    switch (releases.get(id)) {
      case (null) { Runtime.trap("Release not found") };
      case (?_) {
        switch (artists.get(artistId)) {
          case (null) { Runtime.trap("Artist not found") };
          case (?_) {
            let updatedRelease : Release = {
              id;
              title;
              artistId;
              year;
              genre;
            };
            releases.add(id, updatedRelease);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deleteRelease(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete releases");
    };

    if (not releases.containsKey(id)) {
      Runtime.trap("Release not found");
    };
    releases.remove(id);
  };

  public query func getRelease(_id : Nat) : async ?Release {
    releases.get(_id);
  };

  public query func listReleases() : async [Release] {
    releases.values().toArray().sort();
  };

  public query func listReleasesByArtist(artistId : Nat) : async [Release] {
    let filteredList = List.empty<Release>();
    for (release in releases.values()) {
      if (release.artistId == artistId) {
        filteredList.add(release);
      };
    };
    filteredList.toArray().sort();
  };

  // DomainActor CRUD
  public shared ({ caller }) func addDomainActor(name : Text, specialty : Text, bio : Text, imageUrl : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add actors");
    };

    let domainActor : DomainActor = {
      id = nextDomainActorId;
      name;
      specialty;
      bio;
      imageUrl;
    };

    domainActors.add(domainActor.id, domainActor);
    nextDomainActorId += 1;
    domainActor.id;
  };

  public shared ({ caller }) func updateDomainActor(id : Nat, name : Text, specialty : Text, bio : Text, imageUrl : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update actors");
    };

    switch (domainActors.get(id)) {
      case (null) { Runtime.trap("Actor not found") };
      case (?existingDomainActor) {
        let updatedDomainActor : DomainActor = {
          id;
          name;
          specialty;
          bio;
          imageUrl;
        };
        domainActors.add(id, updatedDomainActor);
      };
    };
  };

  public shared ({ caller }) func deleteDomainActor(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete actors");
    };

    if (not domainActors.containsKey(id)) {
      Runtime.trap("Actor not found");
    };
    domainActors.remove(id);
  };

  public query func getDomainActor(_id : Nat) : async ?DomainActor {
    domainActors.get(_id);
  };

  public query func listDomainActors() : async [DomainActor] {
    domainActors.values().toArray().sort();
  };
};

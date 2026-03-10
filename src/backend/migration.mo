import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type OldArtist = {
    id : Nat;
    name : Text;
    genre : Text;
    bio : Text;
    imageUrl : Text;
  };

  type OldRelease = {
    id : Nat;
    title : Text;
    artistId : Nat;
    year : Nat;
    genre : Text;
  };

  type OldUserProfile = {
    name : Text;
  };

  type OldActor = {
    nextArtistId : Nat;
    nextReleaseId : Nat;
    artists : Map.Map<Nat, OldArtist>;
    releases : Map.Map<Nat, OldRelease>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewArtist = {
    id : Nat;
    name : Text;
    genre : Text;
    bio : Text;
    imageUrl : Text;
  };

  type NewRelease = {
    id : Nat;
    title : Text;
    artistId : Nat;
    year : Nat;
    genre : Text;
  };

  type NewUserProfile = {
    name : Text;
  };

  type NewDomainActor = {
    id : Nat;
    name : Text;
    specialty : Text;
    bio : Text;
    imageUrl : Text;
  };

  // New actor with actors domain
  type NewActor = {
    nextArtistId : Nat;
    nextReleaseId : Nat;
    nextDomainActorId : Nat;
    artists : Map.Map<Nat, NewArtist>;
    releases : Map.Map<Nat, NewRelease>;
    domainActors : Map.Map<Nat, NewDomainActor>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    { old with nextDomainActorId = 1; domainActors = Map.empty<Nat, NewDomainActor>() };
  };
};

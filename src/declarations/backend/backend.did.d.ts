import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AssocList = [] | [[[string, ExperienceRequest], List]];
export interface Company {
  'name' : string,
  'email' : string,
  'aprovals' : AssocList,
  'principal_id' : string,
  'profile_pic' : Uint8Array | number[],
}
export type Entity = { 'User' : User } |
  { 'Company' : Company };
export interface Experience {
  'description' : string,
  'end_date' : [] | [Time],
  'start_date' : Time,
  'position' : string,
}
export interface ExperienceRequest { 'status' : Status, 'data' : Experience }
export type List = [] | [[[string, ExperienceRequest], List]];
export type Response = { 'Ok' : null } |
  { 'Err' : string };
export type Response_1 = { 'Ok' : Array<ExperienceRequest> } |
  { 'Err' : string };
export type Response_2 = { 'Ok' : [] | [Entity] } |
  { 'Err' : string };
export type Role = { 'CompanyRole' : null } |
  { 'UserRole' : null };
export type Status = { 'Rejected' : null } |
  { 'Accepted' : null } |
  { 'Canceled' : null } |
  { 'Pending' : null };
export type Time = bigint;
export interface Tokenmania {
  'create_experience' : ActorMethod<
    [
      {
        'description' : string,
        'end_date' : [] | [Time],
        'start_date' : Time,
        'principal_user_id' : string,
        'position' : string,
        'principal_company_id' : string,
      },
    ],
    Response
  >,
  'get' : ActorMethod<[{ 'principal_id' : string }], Response_2>,
  'get_user_experience_request' : ActorMethod<
    [{ 'principal_user_id' : string }],
    Response_1
  >,
  'register' : ActorMethod<
    [
      {
        'username' : string,
        'role' : Role,
        'email' : string,
        'principal_id' : string,
        'profile_pic' : Uint8Array | number[],
      },
    ],
    Response
  >,
  'update_experience_request' : ActorMethod<
    [
      {
        'status' : Status,
        'principal_user_id' : string,
        'principal_company_id' : string,
      },
    ],
    Response
  >,
  'update_profile' : ActorMethod<
    [
      {
        'username' : string,
        'email' : string,
        'principal_id' : string,
        'profile_pic' : Uint8Array | number[],
      },
    ],
    Response
  >,
}
export interface User {
  'name' : string,
  'email' : string,
  'principal_id' : string,
  'experiences' : Array<Experience>,
  'profile_pic' : Uint8Array | number[],
}
export interface _SERVICE extends Tokenmania {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Time = IDL.Int;
  const Response = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Experience = IDL.Record({
    'description' : IDL.Text,
    'end_date' : IDL.Opt(Time),
    'start_date' : Time,
    'position' : IDL.Text,
  });
  const User = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'principal_id' : IDL.Text,
    'experiences' : IDL.Vec(Experience),
    'profile_pic' : IDL.Vec(IDL.Nat8),
  });
  const Status = IDL.Variant({
    'Rejected' : IDL.Null,
    'Accepted' : IDL.Null,
    'Canceled' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const ExperienceRequest = IDL.Record({
    'status' : Status,
    'data' : Experience,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(IDL.Text, ExperienceRequest), List)));
  const AssocList = IDL.Opt(
    IDL.Tuple(IDL.Tuple(IDL.Text, ExperienceRequest), List)
  );
  const Company = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'aprovals' : AssocList,
    'principal_id' : IDL.Text,
    'profile_pic' : IDL.Vec(IDL.Nat8),
  });
  const Entity = IDL.Variant({ 'User' : User, 'Company' : Company });
  const Response_2 = IDL.Variant({ 'Ok' : IDL.Opt(Entity), 'Err' : IDL.Text });
  const Response_1 = IDL.Variant({
    'Ok' : IDL.Vec(ExperienceRequest),
    'Err' : IDL.Text,
  });
  const Role = IDL.Variant({ 'CompanyRole' : IDL.Null, 'UserRole' : IDL.Null });
  const Tokenmania = IDL.Service({
    'create_experience' : IDL.Func(
        [
          IDL.Record({
            'description' : IDL.Text,
            'end_date' : IDL.Opt(Time),
            'start_date' : Time,
            'principal_user_id' : IDL.Text,
            'position' : IDL.Text,
            'principal_company_id' : IDL.Text,
          }),
        ],
        [Response],
        [],
      ),
    'get' : IDL.Func(
        [IDL.Record({ 'principal_id' : IDL.Text })],
        [Response_2],
        [],
      ),
    'get_user_experience_request' : IDL.Func(
        [IDL.Record({ 'principal_user_id' : IDL.Text })],
        [Response_1],
        [],
      ),
    'register' : IDL.Func(
        [
          IDL.Record({
            'username' : IDL.Text,
            'role' : Role,
            'email' : IDL.Text,
            'principal_id' : IDL.Text,
            'profile_pic' : IDL.Vec(IDL.Nat8),
          }),
        ],
        [Response],
        [],
      ),
    'update_experience_request' : IDL.Func(
        [
          IDL.Record({
            'status' : Status,
            'principal_user_id' : IDL.Text,
            'principal_company_id' : IDL.Text,
          }),
        ],
        [Response],
        [],
      ),
    'update_profile' : IDL.Func(
        [
          IDL.Record({
            'username' : IDL.Text,
            'email' : IDL.Text,
            'principal_id' : IDL.Text,
            'profile_pic' : IDL.Vec(IDL.Nat8),
          }),
        ],
        [Response],
        [],
      ),
  });
  return Tokenmania;
};
export const init = ({ IDL }) => { return []; };

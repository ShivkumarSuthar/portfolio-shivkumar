import  serverRequest  from "./axios"

export const getDashboardData = (params = {}) => {
  return serverRequest({
    method: 'get',
    url: '/dashboard',
    params,
  });
};
export const getProjectData = (params = {}) => {
  return serverRequest({
    method: 'get',
    url: '/project/list',
    params,
  });
};
export const createProject = (data) => {
  return serverRequest({
    method: 'post',
    url: '/project/add',
    data, 
  });
};

export const updateProjectData=((params={})=>{
  return serverRequest({
    method:'put',
    url:'/project/update/',
    params
  })
})

export const getOneProjectData = (params = {}) => {
  return serverRequest({
    method: 'get',
    url: '/project',
    params, 
  });
};

export const getWorkDataList= (params={})=>{
  return serverRequest({
    method:'get',
    url:'/work/list',
    params,
  })
}


export const createWorkData = (data) => {
  return serverRequest({
    method: 'post',
    url:'/work/create',
    data, 
  });
};

export const getSkiisListData=(params={})=>{
  return serverRequest({
    method:'get',
    url:'/skills/list',
    params
  })
}

export const createSkillData=(data)=>{
  return serverRequest({
    method:'post',
    url:'/skills/create',
    data
  })
}
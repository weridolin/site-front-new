export const SiteApis = {
  home: {
    getSiteComments: {
      method: "get",
      url: "/home/api/v1/comments",
      authenticated: false,
    },
    submitSiteComment: {
      method: "post",
      url: "/home/api/v1/comments",
      authenticated: true,
    },
    getCommentReply: {
      method: "get",
      url: (rootID: number) => {
        return `/home/api/v1/comments/${rootID}/reply`;
      },
      authenticated: false,
    },
    replyComment: {
      method: "post",
      url: (rootID: number) => {
        return `/home/api/v1/comments/${rootID}/reply`;
      },
      authenticated: true,
    },
    getFriendLinks: {
      method: "get",
      url: "/home/api/v1/friendslinks",
      authenticated: false,
    },
    getSiteUpdateLog: {
      method: "get",
      url: "/home/api/v1/updatelog",
      authenticated: false,
    },
    getBackGroundImages: {
      method: "get",
      url: "/home/api/v1/backGroundImages",
      authenticated: false,
    },
    getBackGroundMusic: {
      method: "get",
      url: "/home/api/v1/backGroundMusic",
      authenticated: false,
    },
  },
  drug: {
    getRandomWord: {
      method: "get",
      url: "/drug/api/v1/words/random/",
      authenticated: false,
    },
  },
  blog: {
    getArticleList: {
      method: "get",
      url: "/blog/api/v1/articles",
      authenticated: false,
    },
  },
  fileBroker: {
    filePreUpload: {
      method: "post",
      url: "/fileBroker/api/v1/",
      authenticated: false,
    },
    searchFileUpload: {
      method: "get",
      url: "/fileBroker/api/v1/search",
      authenticated: false,
    },
    downloadFile: {
      method: "get",
      url: "/fileBroker/api/v1/",
      authenticated: false,
    },
    uploadFile: {
      method: "put",
      url: "/fileBroker/api/v1/",
      authenticated: false,
    },
    generateDownCode: {
      method: "post",
      url: "/fileBroker/api/v1/downCode",
      authenticated: false,
    },
  },
  dataFaker: {
    dataPreUpload: {
      method: "post",
      url: "/dataFaker/api/v1/",
      authenticated: true,
    },
    searchDataFaker: {
      method: "get",
      url: (download_code: string) => {
        return `/dataFaker/api/v1/search/${download_code}`;
      },
      authenticated: true,
    },
    downloadDataFaker: {
      method: "get",
      url: (download_code: string) => {
        return `/dataFaker/api/v1/?download_code=${download_code}`;
      },
      authenticated: true,
    },
  },
  shortUrl: {
    getShortUrl: {
      method: "post",
      url: "/shortUrl/api/v1/create/",
      authenticated: false,
    },
    redirectShortUrl: {
      method: "get",
      url: "/shortUrl/api/v1/redirect/",
      authenticated: false,
    },
  },
  apiCollector: {
    startSpiderTask: {
      method: "post",
      url: "/apiCollector/api/v1/task/",
      authenticated: true,
    },
    getSpiderTask: {
      method: "get",
      url: "/apiCollector/api/v1/apiResource/",
      authenticated: true,
    },
    getApiInfo: {
      method: "get",
      url: "/apiCollector/api/v1/apiInfo",
      authenticated: false,
    },
    searchApiInfo: {
      method: "post",
      url: "/apiCollector/api/v1/apiInfo/search",
      authenticated: false,
    },
  },
  usercenter: {
    login: {
      method: "post",
      url: "/usercenter/api/v1/login",
      authenticated: false,
    },
    logout: {
      method: "post",
      url: "/usercenter/api/v1/logout",
      authenticated: true,
    },
    register: {
      method: "post",
      url: "/usercenter/api/v1/register",
      authenticated: false,
    },
    refreshToken: {
      method: "post",
      url: "/usercenter/api/v1/refreshToken",
      authenticated: false,
    },
    getMenus: {
      method: "get",
      url: "/usercenter/api/v1/rbac/menus",
      authenticated: true,
    },
  },
  webhook: {
    queryHistory: {
      method: "get",
      url: (uuid: string) => {
        return `/webhook/api/v1/${uuid}/history`;
      },
      authenticated: false,
    },
    registerWebsocket:{
      method: "get",
      url:(uuid:string) => {
          return "/webhook/api/v1/register-websocket?uuid="+uuid
        },
      authenticated: false,
    }
  },
  gpt: {
    getConversationsList: {
      method: "get",
      url: "/gpt/api/v1/conversation",
      authenticated: true,
    },
    createConversation: {
      method: "post",
      url: "/gpt/api/v1/conversation",
      authenticated: true,
    },
    deleteConversation: {
      method: "delete",
      url: (uuid: string) => {
        return `/gpt/api/v1/conversation/${uuid}`;
      },
      authenticated: true,
    },
    updateConversation: {
      method: "put",
      url: (uuid: string) => {
        return `/gpt/api/v1/conversation/${uuid}`;
      },
      authenticated: true,
    },
    getMessageList: {
      method: "get",
      url: "/gpt/api/v1/message",
      authenticated: true,
    },
    createMessage: {
      method: "post",
      url: "/gpt/api/v1/message",
      authenticated: true,
    },
    createMessageSSE: {
      method: "post",
      url: "/gpt/api/v1/message/gpt-sse",
      authenticated: true,
    },
    stopMessageSSE: {
      method: "post",
      url: "/gpt/api/v1/message/stop-sse",
      authenticated: true,
    },
    registerWebsocket: {
      method: "post",
      url: "/gpt/api/v1/conversation/register-websocket",
      authenticated: true,
    },
  },
};

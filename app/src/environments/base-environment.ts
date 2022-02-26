const host = 'http://localhost';
const port = '9000';
const suffix = 'api';

const apiUrl = `${host}:${port}/${suffix}`;

const urls: any = {
  user: {
    prefix: 'user',
    calls: {
      getAll: 'all',
      getUserById: 'get/:userId',
      check: 'check/:selector/:value',
      login: 'login',
      register: 'register',
      edit: 'edit/:userId',
      delete: 'delete/:userId'
    }
  },
  group: {
    prefix: 'group',
    calls: {
      getAllGroups: 'all',
      getGroupById: 'get/:groupId',
      getUserGroups: 'get-user-groups/:groupId',
      createGroup: 'create',
      editGroup: 'edit/:groupId',
      deleteGroup: 'delete/:groupId',
      addToGroup: 'add',
      joinToGroup: 'join',
      removeFromGroup: 'remove'
    }
  },
  attraction: {
    prefix: 'attraction',
    calls: {
      getAllAttractions: 'all',
      getAttractionById: 'get/:attractionId',
      createAttraction: 'create',
      editAttraction: 'edit/:attractionId',
      deleteAttraction: 'delete/:attractionId',
    }
  },
  journey: {
    prefix: 'journey',
    calls: {
      getAllJourneys: 'all',
      getJourneyById: 'get/:journeyId',
      createJourney: 'create',
      editJourney: 'edit/:journeyId',
      deleteJourney: 'delete/:journeyId',
    }
  },
  file: {
    prefix: 'file',
    calls: {
      download: 'download/:selector/:filename',
      remove: 'remove/:selector/:filename',
      upload: 'upload/:selector'
    }
  }
}

export const baseEnvironment = {
  apiUrl,
  urls
}

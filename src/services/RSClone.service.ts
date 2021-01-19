export interface NoteInfo {
    id: number,
    name: string
}

export interface AddNoteRequest {
    title: string,
    body: object,
    parents?: Array<NoteInfo>
}

export interface UpdateNoteRequest {
    title?: string,
    body?: object,
    parents?: Array<NoteInfo>
}

export interface UpdateUserRequest {
    email?: string,
    password?: string
}

export interface CreateUserRequest {
    name: string,
    password: string,
    email: string,
}

export interface LogInUserRequest {
    password: string,
    email: string,
}

export default class RSCloneService {
    getResource = async (url: string, options: object) => {
      const response = await fetch(`${url}`, options);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      if (!response.headers.get('content-type')) {
        return {};
      }
      return response.json();
    }

    login = async (data: LogInUserRequest) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await this.getResource('/api/login', options);
      localStorage.setItem('auth-token', res.token);
      return res.token;
    }

    logout = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      await this.getResource('api/logout', options);
      localStorage.removeItem('auth-token');
      return true;
    }

    createUser = async (data: CreateUserRequest) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return this.getResource('/api/user', options);
    }

    deleteUser = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      await this.getResource('api/user/me', options);
      localStorage.removeItem('auth-token');
      return true;
    }

    getUser = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      return this.getResource('api/user/me', options);
    }

    updateUser = async (data: UpdateUserRequest) => {
      if (Object.keys(data).length === 0) {
        throw new Error('At least one field is required');
      }
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      };
      return this.getResource('api/user/me', options);
    }

    addNote = async (data: AddNoteRequest) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      };
      const response = await this.getResource('api/note', options);
      // eslint-disable-next-line no-underscore-dangle
      return response.DATA._id;
    }

    updateNote = async (data: UpdateNoteRequest, id: string) => {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      };
      return this.getResource(`api/note/${id}`, options);
    }

    getNote = async (id: string) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      return this.getResource(`api/note/${id}`, options);
    }

    deleteNote = async (id: string) => {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      return this.getResource(`api/note/${id}`, options);
    }

    getNotes = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      return this.getResource('api/notes', options);
    }

    getNoteByTitle = async (title: string) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      };
      return this.getResource(`api/note/title/${title}`, options);
    }
}

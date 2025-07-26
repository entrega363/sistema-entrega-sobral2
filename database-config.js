// Configuração do banco de dados - Supabase
class DatabaseService {
    constructor() {
        // Configurações do Supabase
        this.supabaseUrl = 'https://aoervohwmuyydtswbnck.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZXJ2b2h3bXV5eWR0c3dibmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0ODg5MzQsImV4cCI6MjA2OTA2NDkzNH0.hg-qGH14zaPlGEJ_4qlM88KzK2GvFsio12hNqde533g';
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`
        };
    }

    // Método genérico para fazer requisições
    async request(endpoint, options = {}) {
        const url = `${this.supabaseUrl}/rest/v1/${endpoint}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Database request error:', error);
            throw error;
        }
    }

    // USUÁRIOS (Entregadores)
    async getUsers() {
        return await this.request('users?select=*');
    }

    async createUser(userData) {
        return await this.request('users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async updateUser(id, userData) {
        return await this.request(`users?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
    }

    async deleteUser(id) {
        return await this.request(`users?id=eq.${id}`, {
            method: 'DELETE'
        });
    }

    // EMPRESAS
    async getEmpresas() {
        return await this.request('empresas?select=*');
    }

    async createEmpresa(empresaData) {
        return await this.request('empresas', {
            method: 'POST',
            body: JSON.stringify(empresaData)
        });
    }

    async updateEmpresa(id, empresaData) {
        return await this.request(`empresas?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(empresaData)
        });
    }

    // PEDIDOS
    async getPedidos() {
        return await this.request('pedidos?select=*&order=criado_em.desc');
    }

    async createPedido(pedidoData) {
        return await this.request('pedidos', {
            method: 'POST',
            body: JSON.stringify(pedidoData)
        });
    }

    async updatePedido(id, pedidoData) {
        return await this.request(`pedidos?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(pedidoData)
        });
    }

    // AUTENTICAÇÃO
    async login(email, senha, tipo) {
        let table = '';
        switch(tipo) {
            case 'admin': table = 'admins'; break;
            case 'empresa': table = 'empresas'; break;
            default: table = 'users'; break;
        }

        const users = await this.request(`${table}?email=eq.${email}&senha=eq.${senha}`);
        return users.length > 0 ? users[0] : null;
    }

    // PAGAMENTOS
    async getPagamentos() {
        return await this.request('pagamentos?select=*&order=criado_em.desc');
    }

    async createPagamento(pagamentoData) {
        return await this.request('pagamentos', {
            method: 'POST',
            body: JSON.stringify(pagamentoData)
        });
    }

    async updatePagamento(id, pagamentoData) {
        return await this.request(`pagamentos?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(pagamentoData)
        });
    }
}

// Instância global do serviço de banco
const db = new DatabaseService();

// Hook personalizado para usar com React
function useDatabaseState(key, initialValue, fetchFunction) {
    const [state, setState] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await fetchFunction();
                setState(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error(`Error fetching ${key}:`, err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const updateState = async (newData) => {
        setState(newData);
    };

    return [state, updateState, loading, error];
}
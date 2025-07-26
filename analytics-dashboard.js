// Analytics Dashboard Component for Sistema Entrega Sobral v5.0
// Advanced analytics with real-time metrics and business intelligence

const AnalyticsDashboard = ({ pedidos, empresas, users, realTimeData }) => {
    const [activeMetric, setActiveMetric] = useState('overview');
    const [dateRange, setDateRange] = useState('today');
    const [loading, setLoading] = useState(false);

    // Calculate advanced metrics
    const calculateMetrics = () => {
        const hoje = new Date();
        const ontem = new Date(hoje);
        ontem.setDate(ontem.getDate() - 1);
        
        const pedidosHoje = pedidos.filter(p => {
            const pedidoDate = new Date(p.criadoEm);
            return pedidoDate.toDateString() === hoje.toDateString();
        });

        const pedidosOntem = pedidos.filter(p => {
            const pedidoDate = new Date(p.criadoEm);
            return pedidoDate.toDateString() === ontem.toDateString();
        });

        const faturamentoHoje = pedidosHoje.reduce((sum, p) => sum + p.valor, 0);
        const faturamentoOntem = pedidosOntem.reduce((sum, p) => sum + p.valor, 0);
        
        const crescimentoFaturamento = faturamentoOntem > 0 
            ? ((faturamentoHoje - faturamentoOntem) / faturamentoOntem * 100).toFixed(1)
            : 0;

        const ticketMedio = pedidosHoje.length > 0 
            ? (faturamentoHoje / pedidosHoje.length).toFixed(2)
            : 0;

        const tempoMedioEntrega = pedidosHoje
            .filter(p => p.status === 'entregue' && p.tracking?.tempoRealEntrega)
            .reduce((sum, p, _, arr) => {
                const tempo = p.tracking.tempoRealEntrega;
                return sum + tempo / arr.length;
            }, 0);

        const taxaConversao = realTimeData.activeUsers > 0 
            ? (pedidosHoje.length / realTimeData.activeUsers * 100).toFixed(1)
            : 0;

        return {
            faturamentoHoje,
            crescimentoFaturamento,
            pedidosHoje: pedidosHoje.length,
            ticketMedio,
            tempoMedioEntrega: tempoMedioEntrega.toFixed(0),
            taxaConversao,
            entregadoresAtivos: users.filter(u => u.disponivel).length,
            empresasOnline: empresas.filter(e => e.status === 'ativo').length
        };
    };

    const metrics = calculateMetrics();

    // Real-time chart data
    const generateChartData = () => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date;
        });

        const dailyData = last7Days.map(date => {
            const dayPedidos = pedidos.filter(p => {
                const pedidoDate = new Date(p.criadoEm);
                return pedidoDate.toDateString() === date.toDateString();
            });
            
            return {
                date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
                pedidos: dayPedidos.length,
                faturamento: dayPedidos.reduce((sum, p) => sum + p.valor, 0),
                ticketMedio: dayPedidos.length > 0 
                    ? dayPedidos.reduce((sum, p) => sum + p.valor, 0) / dayPedidos.length 
                    : 0
            };
        });

        return dailyData;
    };

    const chartData = generateChartData();

    // Render metric cards
    const renderMetricCards = () => {
        const cards = [
            {
                title: 'Faturamento Hoje',
                value: `R$ ${metrics.faturamentoHoje.toFixed(2)}`,
                change: `${metrics.crescimentoFaturamento}%`,
                changeType: parseFloat(metrics.crescimentoFaturamento) >= 0 ? 'positive' : 'negative',
                icon: '💰',
                color: 'bg-green-500'
            },
            {
                title: 'Pedidos Hoje',
                value: metrics.pedidosHoje,
                change: `${realTimeData.pendingOrders} pendentes`,
                changeType: 'neutral',
                icon: '📦',
                color: 'bg-blue-500'
            },
            {
                title: 'Ticket Médio',
                value: `R$ ${metrics.ticketMedio}`,
                change: 'Últimas 24h',
                changeType: 'neutral',
                icon: '🎯',
                color: 'bg-purple-500'
            },
            {
                title: 'Tempo Médio Entrega',
                value: `${metrics.tempoMedioEntrega}min`,
                change: `${realTimeData.avgDeliveryTime}min atual`,
                changeType: 'neutral',
                icon: '⏱️',
                color: 'bg-orange-500'
            },
            {
                title: 'Taxa Conversão',
                value: `${metrics.taxaConversao}%`,
                change: `${realTimeData.activeUsers} usuários online`,
                changeType: 'positive',
                icon: '📈',
                color: 'bg-indigo-500'
            },
            {
                title: 'Entregadores Ativos',
                value: metrics.entregadoresAtivos,
                change: `${realTimeData.onlineDrivers} online agora`,
                changeType: 'positive',
                icon: '🏍️',
                color: 'bg-yellow-500'
            }
        ];

        return React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
        }, cards.map((card, index) =>
            React.createElement('div', {
                key: index,
                className: `${card.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 fade-in-up`
            }, [
                React.createElement('div', {
                    key: 'header',
                    className: 'flex items-center justify-between mb-4'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-3xl'
                    }, card.icon),
                    React.createElement('div', {
                        key: 'indicator',
                        className: 'online-indicator'
                    })
                ]),
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-lg font-semibold mb-2'
                }, card.title),
                React.createElement('p', {
                    key: 'value',
                    className: 'text-3xl font-bold mb-2'
                }, card.value),
                React.createElement('p', {
                    key: 'change',
                    className: `text-sm opacity-90 ${
                        card.changeType === 'positive' ? 'text-green-200' :
                        card.changeType === 'negative' ? 'text-red-200' : 'text-gray-200'
                    }`
                }, card.change)
            ])
        ));
    };

    // Render advanced charts
    const renderCharts = () => {
        return React.createElement('div', {
            className: 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'
        }, [
            // Revenue chart
            React.createElement('div', {
                key: 'revenue-chart',
                className: 'glass-effect p-6 rounded-lg'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-xl font-bold text-white mb-4'
                }, '📊 Faturamento - Últimos 7 Dias'),
                React.createElement('div', {
                    key: 'chart',
                    className: 'chart-container'
                }, [
                    React.createElement('canvas', {
                        key: 'canvas',
                        id: 'revenueChart',
                        className: 'w-full h-full'
                    })
                ])
            ]),

            // Orders distribution
            React.createElement('div', {
                key: 'orders-chart',
                className: 'glass-effect p-6 rounded-lg'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-xl font-bold text-white mb-4'
                }, '🍕 Distribuição por Categoria'),
                React.createElement('div', {
                    key: 'chart',
                    className: 'chart-container'
                }, [
                    React.createElement('canvas', {
                        key: 'canvas',
                        id: 'categoryChart',
                        className: 'w-full h-full'
                    })
                ])
            ])
        ]);
    };

    // Render real-time feed
    const renderRealTimeFeed = () => {
        const recentActivities = [
            { type: 'order', message: 'Novo pedido #1234 - Pizza Margherita', time: '2 min atrás', icon: '📦' },
            { type: 'delivery', message: 'João entregou pedido #1233', time: '5 min atrás', icon: '✅' },
            { type: 'user', message: 'Nova empresa cadastrada: Burguer House', time: '10 min atrás', icon: '🏢' },
            { type: 'payment', message: 'Pagamento PIX aprovado - R$ 45,90', time: '12 min atrás', icon: '💳' }
        ];

        return React.createElement('div', {
            className: 'glass-effect p-6 rounded-lg'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-xl font-bold text-white mb-4 flex items-center'
            }, [
                React.createElement('span', { key: 'icon', className: 'mr-2' }, '🔴'),
                'Feed em Tempo Real'
            ]),
            React.createElement('div', {
                key: 'feed',
                className: 'space-y-3 max-h-96 overflow-y-auto'
            }, recentActivities.map((activity, index) =>
                React.createElement('div', {
                    key: index,
                    className: 'flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg slide-in-left'
                }, [
                    React.createElement('span', {
                        key: 'icon',
                        className: 'text-2xl'
                    }, activity.icon),
                    React.createElement('div', {
                        key: 'content',
                        className: 'flex-1'
                    }, [
                        React.createElement('p', {
                            key: 'message',
                            className: 'text-white text-sm'
                        }, activity.message),
                        React.createElement('p', {
                            key: 'time',
                            className: 'text-gray-300 text-xs'
                        }, activity.time)
                    ])
                ])
            ))
        ]);
    };

    // Initialize charts
    useEffect(() => {
        if (window.Chart && chartData.length > 0) {
            // Revenue chart
            const revenueCtx = document.getElementById('revenueChart');
            if (revenueCtx) {
                new Chart(revenueCtx, {
                    type: 'line',
                    data: {
                        labels: chartData.map(d => d.date),
                        datasets: [{
                            label: 'Faturamento (R$)',
                            data: chartData.map(d => d.faturamento),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { labels: { color: 'white' } }
                        },
                        scales: {
                            x: { ticks: { color: 'white' } },
                            y: { ticks: { color: 'white' } }
                        }
                    }
                });
            }

            // Category chart
            const categoryCtx = document.getElementById('categoryChart');
            if (categoryCtx) {
                const categorias = empresas.reduce((acc, emp) => {
                    acc[emp.categoria] = (acc[emp.categoria] || 0) + 1;
                    return acc;
                }, {});

                new Chart(categoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(categorias),
                        datasets: [{
                            data: Object.values(categorias),
                            backgroundColor: [
                                '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { labels: { color: 'white' } }
                        }
                    }
                });
            }
        }
    }, [chartData, empresas]);

    return React.createElement('div', {
        className: 'space-y-6'
    }, [
        // Header with real-time indicator
        React.createElement('div', {
            key: 'header',
            className: 'flex justify-between items-center mb-6'
        }, [
            React.createElement('h2', {
                key: 'title',
                className: 'text-2xl font-bold text-white gradient-text'
            }, '📊 Analytics Dashboard Enterprise'),
            React.createElement('div', {
                key: 'status',
                className: 'flex items-center space-x-2 text-white'
            }, [
                React.createElement('div', {
                    key: 'indicator',
                    className: 'online-indicator'
                }),
                React.createElement('span', {
                    key: 'text',
                    className: 'text-sm'
                }, 'Dados em tempo real')
            ])
        ]),

        // Metric cards
        renderMetricCards(),

        // Charts section
        renderCharts(),

        // Real-time feed
        React.createElement('div', {
            key: 'feed-section',
            className: 'grid grid-cols-1 lg:grid-cols-3 gap-6'
        }, [
            React.createElement('div', {
                key: 'feed',
                className: 'lg:col-span-2'
            }, renderRealTimeFeed()),

            // Quick actions
            React.createElement('div', {
                key: 'actions',
                className: 'glass-effect p-6 rounded-lg'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-xl font-bold text-white mb-4'
                }, '⚡ Ações Rápidas'),
                React.createElement('div', {
                    key: 'buttons',
                    className: 'space-y-3'
                }, [
                    React.createElement('button', {
                        key: 'export',
                        className: 'w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200'
                    }, '📄 Exportar Relatório'),
                    React.createElement('button', {
                        key: 'whatsapp',
                        className: 'w-full whatsapp-button'
                    }, [
                        React.createElement('span', { key: 'icon' }, '📱'),
                        'WhatsApp Business'
                    ]),
                    React.createElement('button', {
                        key: 'backup',
                        className: 'w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200'
                    }, '☁️ Backup Dados')
                ])
            ])
        ])
    ]);
};

export default AnalyticsDashboard;
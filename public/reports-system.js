// Advanced Reports System for Sistema Entrega Sobral v5.0
// PDF generation, data export, and business intelligence

const ReportsSystem = ({ pedidos, empresas, users, currentUser }) => {
    const [activeReport, setActiveReport] = useState('financial');
    const [dateRange, setDateRange] = useState({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
    });
    const [filters, setFilters] = useState({
        empresa: '',
        entregador: '',
        status: '',
        formaPagamento: ''
    });
    const [loading, setLoading] = useState(false);

    // Filter data based on date range and filters
    const getFilteredData = () => {
        return pedidos.filter(pedido => {
            const pedidoDate = new Date(pedido.criadoEm);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            
            // Date filter
            if (pedidoDate < startDate || pedidoDate > endDate) return false;
            
            // Other filters
            if (filters.empresa && pedido.empresaId !== filters.empresa) return false;
            if (filters.entregador && pedido.entregadorId !== filters.entregador) return false;
            if (filters.status && pedido.status !== filters.status) return false;
            if (filters.formaPagamento && pedido.formaPagamento !== filters.formaPagamento) return false;
            
            return true;
        });
    };

    const filteredPedidos = getFilteredData();

    // Generate financial report
    const generateFinancialReport = async () => {
        setLoading(true);
        
        try {
            const { jsPDF } = window.jsPDF;
            const doc = new jsPDF();
            
            // Header
            doc.setFontSize(20);
            doc.setTextColor(31, 41, 55); // Gray-800
            doc.text('RELATÓRIO FINANCEIRO', 20, 20);
            
            doc.setFontSize(12);
            doc.setTextColor(107, 114, 128); // Gray-500
            doc.text(`Período: ${new Date(dateRange.start).toLocaleDateString('pt-BR')} a ${new Date(dateRange.end).toLocaleDateString('pt-BR')}`, 20, 30);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 20, 40);
            doc.text('Sistema Entrega Sobral - Enterprise v5.0', 20, 50);

            // Summary metrics
            const totalPedidos = filteredPedidos.length;
            const faturamentoTotal = filteredPedidos.reduce((sum, p) => sum + p.valor, 0);
            const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;
            const comissaoTotal = faturamentoTotal * 0.08; // 8% commission
            
            doc.setFontSize(14);
            doc.setTextColor(31, 41, 55);
            doc.text('RESUMO EXECUTIVO', 20, 70);
            
            doc.setFontSize(11);
            doc.text(`Total de Pedidos: ${totalPedidos}`, 20, 85);
            doc.text(`Faturamento Bruto: R$ ${faturamentoTotal.toFixed(2)}`, 20, 95);
            doc.text(`Ticket Médio: R$ ${ticketMedio.toFixed(2)}`, 20, 105);
            doc.text(`Comissão Total (8%): R$ ${comissaoTotal.toFixed(2)}`, 20, 115);
            
            // Revenue by company
            const revenueByCompany = empresas.map(empresa => {
                const empresaPedidos = filteredPedidos.filter(p => p.empresaId === empresa.id);
                const faturamento = empresaPedidos.reduce((sum, p) => sum + p.valor, 0);
                const comissao = faturamento * 0.08;
                
                return {
                    nome: empresa.nome,
                    pedidos: empresaPedidos.length,
                    faturamento,
                    comissao,
                    ticketMedio: empresaPedidos.length > 0 ? faturamento / empresaPedidos.length : 0
                };
            }).filter(empresa => empresa.pedidos > 0)
              .sort((a, b) => b.faturamento - a.faturamento);

            doc.setFontSize(14);
            doc.text('FATURAMENTO POR EMPRESA', 20, 135);
            
            let y = 150;
            doc.setFontSize(10);
            doc.text('Empresa', 20, y);
            doc.text('Pedidos', 80, y);
            doc.text('Faturamento', 120, y);
            doc.text('Comissão', 160, y);
            
            revenueByCompany.forEach((empresa, index) => {
                y += 10;
                if (y > 270) { // New page
                    doc.addPage();
                    y = 20;
                }
                
                doc.text(empresa.nome.substring(0, 20), 20, y);
                doc.text(empresa.pedidos.toString(), 80, y);
                doc.text(`R$ ${empresa.faturamento.toFixed(2)}`, 120, y);
                doc.text(`R$ ${empresa.comissao.toFixed(2)}`, 160, y);
            });

            // Payment methods analysis
            const paymentMethods = filteredPedidos.reduce((acc, pedido) => {
                const method = pedido.formaPagamento || 'não informado';
                acc[method] = (acc[method] || 0) + pedido.valor;
                return acc;
            }, {});

            if (y > 220) {
                doc.addPage();
                y = 20;
            } else {
                y += 30;
            }

            doc.setFontSize(14);
            doc.text('ANÁLISE POR FORMA DE PAGAMENTO', 20, y);
            
            y += 15;
            Object.entries(paymentMethods).forEach(([method, value]) => {
                y += 10;
                const percentage = ((value / faturamentoTotal) * 100).toFixed(1);
                doc.setFontSize(10);
                doc.text(`${method.toUpperCase()}: R$ ${value.toFixed(2)} (${percentage}%)`, 20, y);
            });

            // Save PDF
            doc.save(`relatorio-financeiro-${dateRange.start}-${dateRange.end}.pdf`);
            
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            alert('Erro ao gerar relatório PDF');
        }
        
        setLoading(false);
    };

    // Generate delivery performance report
    const generateDeliveryReport = async () => {
        setLoading(true);
        
        try {
            const { jsPDF } = window.jsPDF;
            const doc = new jsPDF();
            
            // Header
            doc.setFontSize(20);
            doc.text('RELATÓRIO DE PERFORMANCE DE ENTREGAS', 20, 20);
            
            doc.setFontSize(12);
            doc.text(`Período: ${new Date(dateRange.start).toLocaleDateString('pt-BR')} a ${new Date(dateRange.end).toLocaleDateString('pt-BR')}`, 20, 30);
            doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 20, 40);

            // Delivery metrics
            const entregasCompletas = filteredPedidos.filter(p => p.status === 'entregue');
            const tempoMedioEntrega = entregasCompletas
                .filter(p => p.tracking?.tempoRealEntrega)
                .reduce((sum, p, _, arr) => sum + p.tracking.tempoRealEntrega / arr.length, 0);

            doc.setFontSize(14);
            doc.text('MÉTRICAS GERAIS', 20, 60);
            
            doc.setFontSize(11);
            doc.text(`Total de Entregas: ${entregasCompletas.length}`, 20, 75);
            doc.text(`Tempo Médio de Entrega: ${tempoMedioEntrega.toFixed(0)} minutos`, 20, 85);
            doc.text(`Taxa de Sucesso: ${((entregasCompletas.length / filteredPedidos.length) * 100).toFixed(1)}%`, 20, 95);

            // Performance by driver
            const driverPerformance = users
                .filter(user => user.tipo === 'entregador')
                .map(entregador => {
                    const entregadorPedidos = filteredPedidos.filter(p => p.entregadorId === entregador.id);
                    const entregasCompletas = entregadorPedidos.filter(p => p.status === 'entregue');
                    
                    return {
                        nome: entregador.nome,
                        totalEntregas: entregasCompletas.length,
                        avaliacaoMedia: entregador.avaliacaoMedia || 0,
                        tempoMedio: entregadorPedidos
                            .filter(p => p.tracking?.tempoRealEntrega)
                            .reduce((sum, p, _, arr) => sum + p.tracking.tempoRealEntrega / arr.length, 0) || 0
                    };
                })
                .filter(driver => driver.totalEntregas > 0)
                .sort((a, b) => b.totalEntregas - a.totalEntregas);

            doc.setFontSize(14);
            doc.text('PERFORMANCE POR ENTREGADOR', 20, 115);
            
            let y = 130;
            doc.setFontSize(10);
            doc.text('Entregador', 20, y);
            doc.text('Entregas', 80, y);
            doc.text('Avaliação', 120, y);
            doc.text('Tempo Médio', 160, y);
            
            driverPerformance.forEach(driver => {
                y += 10;
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                
                doc.text(driver.nome.substring(0, 20), 20, y);
                doc.text(driver.totalEntregas.toString(), 80, y);
                doc.text(`${driver.avaliacaoMedia.toFixed(1)}/5`, 120, y);
                doc.text(`${driver.tempoMedio.toFixed(0)}min`, 160, y);
            });

            doc.save(`relatorio-entregas-${dateRange.start}-${dateRange.end}.pdf`);
            
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            alert('Erro ao gerar relatório PDF');
        }
        
        setLoading(false);
    };

    // Export data to CSV
    const exportToCSV = (data, filename) => {
        const headers = [
            'ID', 'Cliente', 'Empresa', 'Entregador', 'Valor', 'Status', 
            'Forma Pagamento', 'Data Criação', 'Endereço', 'Telefone'
        ];
        
        const csvContent = [
            headers.join(','),
            ...data.map(pedido => [
                pedido.id,
                `"${pedido.cliente}"`,
                `"${pedido.empresaNome}"`,
                `"${pedido.entregadorNome || 'N/A'}"`,
                pedido.valor.toFixed(2),
                pedido.status,
                pedido.formaPagamento || 'N/A',
                new Date(pedido.criadoEm).toLocaleDateString('pt-BR'),
                `"${pedido.endereco}"`,
                pedido.telefone
            ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Render filters
    const renderFilters = () => {
        return React.createElement('div', {
            className: 'glass-effect p-6 rounded-lg mb-6'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-lg font-bold text-white mb-4'
            }, '🔍 Filtros e Período'),
            
            React.createElement('div', {
                key: 'filters',
                className: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'
            }, [
                // Date range
                React.createElement('div', { key: 'date-start' }, [
                    React.createElement('label', {
                        key: 'label',
                        className: 'block text-white text-sm mb-1'
                    }, 'Data Início'),
                    React.createElement('input', {
                        key: 'input',
                        type: 'date',
                        value: dateRange.start,
                        onChange: (e) => setDateRange(prev => ({ ...prev, start: e.target.value })),
                        className: 'w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500'
                    })
                ]),
                
                React.createElement('div', { key: 'date-end' }, [
                    React.createElement('label', {
                        key: 'label',
                        className: 'block text-white text-sm mb-1'
                    }, 'Data Fim'),
                    React.createElement('input', {
                        key: 'input',
                        type: 'date',
                        value: dateRange.end,
                        onChange: (e) => setDateRange(prev => ({ ...prev, end: e.target.value })),
                        className: 'w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500'
                    })
                ]),
                
                // Company filter
                React.createElement('div', { key: 'empresa' }, [
                    React.createElement('label', {
                        key: 'label',
                        className: 'block text-white text-sm mb-1'
                    }, 'Empresa'),
                    React.createElement('select', {
                        key: 'select',
                        value: filters.empresa,
                        onChange: (e) => setFilters(prev => ({ ...prev, empresa: e.target.value })),
                        className: 'w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500'
                    }, [
                        React.createElement('option', { key: 'all', value: '' }, 'Todas'),
                        ...empresas.map(empresa =>
                            React.createElement('option', { key: empresa.id, value: empresa.id }, empresa.nome)
                        )
                    ])
                ]),
                
                // Status filter
                React.createElement('div', { key: 'status' }, [
                    React.createElement('label', {
                        key: 'label',
                        className: 'block text-white text-sm mb-1'
                    }, 'Status'),
                    React.createElement('select', {
                        key: 'select',
                        value: filters.status,
                        onChange: (e) => setFilters(prev => ({ ...prev, status: e.target.value })),
                        className: 'w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500'
                    }, [
                        React.createElement('option', { key: 'all', value: '' }, 'Todos'),
                        React.createElement('option', { key: 'disponivel', value: 'disponivel' }, 'Disponível'),
                        React.createElement('option', { key: 'em_preparo', value: 'em_preparo' }, 'Em Preparo'),
                        React.createElement('option', { key: 'pronto', value: 'pronto' }, 'Pronto'),
                        React.createElement('option', { key: 'em_entrega', value: 'em_entrega' }, 'Em Entrega'),
                        React.createElement('option', { key: 'entregue', value: 'entregue' }, 'Entregue')
                    ])
                ]),
                
                // Payment method filter
                React.createElement('div', { key: 'pagamento' }, [
                    React.createElement('label', {
                        key: 'label',
                        className: 'block text-white text-sm mb-1'
                    }, 'Pagamento'),
                    React.createElement('select', {
                        key: 'select',
                        value: filters.formaPagamento,
                        onChange: (e) => setFilters(prev => ({ ...prev, formaPagamento: e.target.value })),
                        className: 'w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500'
                    }, [
                        React.createElement('option', { key: 'all', value: '' }, 'Todos'),
                        React.createElement('option', { key: 'pix', value: 'pix' }, 'PIX'),
                        React.createElement('option', { key: 'cartao', value: 'cartao' }, 'Cartão'),
                        React.createElement('option', { key: 'dinheiro', value: 'dinheiro' }, 'Dinheiro')
                    ])
                ])
            ]),
            
            React.createElement('div', {
                key: 'summary',
                className: 'mt-4 text-white text-sm'
            }, `${filteredPedidos.length} pedidos encontrados | Faturamento: R$ ${filteredPedidos.reduce((sum, p) => sum + p.valor, 0).toFixed(2)}`)
        ]);
    };

    // Render report actions
    const renderActions = () => {
        return React.createElement('div', {
            className: 'glass-effect p-6 rounded-lg mb-6'
        }, [
            React.createElement('h3', {
                key: 'title',
                className: 'text-lg font-bold text-white mb-4'
            }, '📊 Gerar Relatórios'),
            
            React.createElement('div', {
                key: 'actions',
                className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
            }, [
                React.createElement('button', {
                    key: 'financial',
                    onClick: generateFinancialReport,
                    disabled: loading,
                    className: 'bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition duration-200'
                }, loading ? '⏳ Gerando...' : '💰 Relatório Financeiro'),
                
                React.createElement('button', {
                    key: 'delivery',
                    onClick: generateDeliveryReport,
                    disabled: loading,
                    className: 'bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200'
                }, loading ? '⏳ Gerando...' : '🚚 Performance Entregas'),
                
                React.createElement('button', {
                    key: 'csv',
                    onClick: () => exportToCSV(filteredPedidos, `pedidos-${dateRange.start}-${dateRange.end}.csv`),
                    className: 'bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200'
                }, '📄 Exportar CSV'),
                
                React.createElement('button', {
                    key: 'analytics',
                    className: 'bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-200'
                }, '📈 Analytics Avançado')
            ])
        ]);
    };

    return React.createElement('div', {
        className: 'space-y-6'
    }, [
        React.createElement('div', {
            key: 'header',
            className: 'text-center mb-6'
        }, [
            React.createElement('h2', {
                key: 'title',
                className: 'text-3xl font-bold text-white gradient-text mb-2'
            }, '📊 Sistema de Relatórios Enterprise'),
            React.createElement('p', {
                key: 'subtitle',
                className: 'text-gray-300'
            }, 'Relatórios avançados e business intelligence')
        ]),
        
        renderFilters(),
        renderActions()
    ]);
};

export default ReportsSystem;
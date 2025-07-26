// WhatsApp Business Integration for Sistema Entrega Sobral v5.0
// Advanced messaging system with templates and automation

const WhatsAppIntegration = ({ currentUser, pedidos, empresas, users }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [templates, setTemplates] = useState([
        {
            id: 'order_confirmation',
            name: 'Confirmação de Pedido',
            template: `🚚 *{{empresa_nome}}*\n\nOlá {{cliente_nome}}!\n\nSeu pedido #{{pedido_id}} foi confirmado:\n\n📦 {{itens}}\n💰 Total: R$ {{valor}}\n📍 Endereço: {{endereco}}\n⏰ Tempo estimado: {{tempo_estimado}}\n\nAcompanhe seu pedido em tempo real!\n\n_Entrega Sobral - Delivery Inteligente_`,
            variables: ['empresa_nome', 'cliente_nome', 'pedido_id', 'itens', 'valor', 'endereco', 'tempo_estimado'],
            active: true
        },
        {
            id: 'status_update',
            name: 'Atualização de Status',
            template: `🚚 *Entrega Sobral*\n\n{{status_message}}\n\nPedido #{{pedido_id}}\n{{entregador_info}}\n\n_Obrigado por escolher nossos serviços!_`,
            variables: ['status_message', 'pedido_id', 'entregador_info'],
            active: true
        },
        {
            id: 'delivery_completed',
            name: 'Entrega Concluída',
            template: `🎉 *Pedido Entregue!*\n\nSeu pedido #{{pedido_id}} foi entregue com sucesso!\n\n⭐ Que tal avaliar nosso serviço?\nSua opinião é muito importante!\n\n🚚 *Entrega Sobral*\n_Delivery que conecta Sobral_`,
            variables: ['pedido_id'],
            active: true
        },
        {
            id: 'promotional',
            name: 'Mensagem Promocional',
            template: `🔥 *OFERTA ESPECIAL!*\n\n{{promocao_titulo}}\n\n{{promocao_descricao}}\n\n💰 Desconto: {{desconto}}\n⏰ Válido até: {{validade}}\n\n🛒 Peça já pelo nosso sistema!\n\n_{{empresa_nome}} - Entrega Sobral_`,
            variables: ['promocao_titulo', 'promocao_descricao', 'desconto', 'validade', 'empresa_nome'],
            active: false
        }
    ]);

    const [messageHistory, setMessageHistory] = useState([]);
    const [bulkMessage, setBulkMessage] = useState({
        template: '',
        recipients: [],
        scheduled: false,
        scheduleDate: ''
    });

    // WhatsApp API simulation
    const sendWhatsAppMessage = (phone, message, templateId = null) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const timestamp = new Date().toISOString();
        
        // Add to history
        const newMessage = {
            id: Date.now(),
            phone: cleanPhone,
            message,
            templateId,
            status: 'sent',
            timestamp,
            delivered: false,
            read: false
        };
        
        setMessageHistory(prev => [newMessage, ...prev]);
        
        // Simulate WhatsApp Web opening
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Simulate delivery status update
        setTimeout(() => {
            setMessageHistory(prev => 
                prev.map(msg => 
                    msg.id === newMessage.id 
                        ? { ...msg, delivered: true }
                        : msg
                )
            );
        }, 2000);
        
        return newMessage;
    };

    // Template processing
    const processTemplate = (template, variables) => {
        let processedMessage = template.template;
        
        Object.keys(variables).forEach(key => {
            const placeholder = `{{${key}}}`;
            processedMessage = processedMessage.replace(
                new RegExp(placeholder, 'g'), 
                variables[key] || ''
            );
        });
        
        return processedMessage;
    };

    // Send order notification
    const sendOrderNotification = (pedido) => {
        const template = templates.find(t => t.id === 'order_confirmation');
        if (!template || !template.active) return;

        const empresa = empresas.find(e => e.id === pedido.empresaId);
        const variables = {
            empresa_nome: empresa?.nome || 'Restaurante',
            cliente_nome: pedido.cliente,
            pedido_id: pedido.id,
            itens: pedido.items.map(item => `${item.quantidade}x ${item.nome}`).join('\n'),
            valor: pedido.valor.toFixed(2),
            endereco: pedido.endereco,
            tempo_estimado: pedido.tempoEstimado
        };

        const message = processTemplate(template, variables);
        return sendWhatsAppMessage(pedido.telefone, message, template.id);
    };

    // Send status update
    const sendStatusUpdate = (pedido, newStatus) => {
        const template = templates.find(t => t.id === 'status_update');
        if (!template || !template.active) return;

        const statusMessages = {
            'em_preparo': '👨‍🍳 Seu pedido está sendo preparado com carinho!',
            'pronto': '✅ Seu pedido está pronto e será entregue em breve!',
            'em_entrega': '🚚 Seu pedido saiu para entrega!',
            'entregue': '🎉 Pedido entregue com sucesso!'
        };

        const entregadorInfo = pedido.entregadorNome 
            ? `\n🏍️ Entregador: ${pedido.entregadorNome}`
            : '';

        const variables = {
            status_message: statusMessages[newStatus] || 'Status atualizado',
            pedido_id: pedido.id,
            entregador_info: entregadorInfo
        };

        const message = processTemplate(template, variables);
        return sendWhatsAppMessage(pedido.telefone, message, template.id);
    };

    // Bulk messaging
    const sendBulkMessage = () => {
        const template = templates.find(t => t.id === bulkMessage.template);
        if (!template) return;

        bulkMessage.recipients.forEach((recipient, index) => {
            setTimeout(() => {
                const message = processTemplate(template, recipient.variables);
                sendWhatsAppMessage(recipient.phone, message, template.id);
            }, index * 1000); // 1 second delay between messages
        });
    };

    // Analytics
    const getMessageStats = () => {
        const today = new Date().toDateString();
        const todayMessages = messageHistory.filter(msg => 
            new Date(msg.timestamp).toDateString() === today
        );

        return {
            totalSent: messageHistory.length,
            sentToday: todayMessages.length,
            deliveryRate: messageHistory.length > 0 
                ? (messageHistory.filter(msg => msg.delivered).length / messageHistory.length * 100).toFixed(1)
                : 0,
            readRate: messageHistory.length > 0
                ? (messageHistory.filter(msg => msg.read).length / messageHistory.length * 100).toFixed(1)
                : 0
        };
    };

    const stats = getMessageStats();

    // Render dashboard
    const renderDashboard = () => {
        return React.createElement('div', {
            className: 'space-y-6'
        }, [
            // Stats cards
            React.createElement('div', {
                key: 'stats',
                className: 'grid grid-cols-1 md:grid-cols-4 gap-6'
            }, [
                {
                    title: 'Mensagens Enviadas',
                    value: stats.totalSent,
                    subtitle: `${stats.sentToday} hoje`,
                    icon: '📤',
                    color: 'bg-green-500'
                },
                {
                    title: 'Taxa de Entrega',
                    value: `${stats.deliveryRate}%`,
                    subtitle: 'Últimas 24h',
                    icon: '✅',
                    color: 'bg-blue-500'
                },
                {
                    title: 'Taxa de Leitura',
                    value: `${stats.readRate}%`,
                    subtitle: 'Engajamento',
                    icon: '👁️',
                    color: 'bg-purple-500'
                },
                {
                    title: 'Templates Ativos',
                    value: templates.filter(t => t.active).length,
                    subtitle: `${templates.length} total`,
                    icon: '📝',
                    color: 'bg-orange-500'
                }
            ].map((card, index) =>
                React.createElement('div', {
                    key: index,
                    className: `${card.color} text-white p-6 rounded-lg shadow-lg`
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
                            key: 'whatsapp-logo',
                            className: 'text-2xl'
                        }, '📱')
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
                        key: 'subtitle',
                        className: 'text-sm opacity-90'
                    }, card.subtitle)
                ])
            )),

            // Recent messages
            React.createElement('div', {
                key: 'recent-messages',
                className: 'glass-effect p-6 rounded-lg'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-xl font-bold text-white mb-4'
                }, '📱 Mensagens Recentes'),
                React.createElement('div', {
                    key: 'messages',
                    className: 'space-y-3 max-h-96 overflow-y-auto'
                }, messageHistory.slice(0, 10).map(msg =>
                    React.createElement('div', {
                        key: msg.id,
                        className: 'bg-white bg-opacity-10 p-4 rounded-lg'
                    }, [
                        React.createElement('div', {
                            key: 'header',
                            className: 'flex justify-between items-start mb-2'
                        }, [
                            React.createElement('span', {
                                key: 'phone',
                                className: 'text-white font-medium'
                            }, `+55 ${msg.phone}`),
                            React.createElement('div', {
                                key: 'status',
                                className: 'flex space-x-2'
                            }, [
                                React.createElement('span', {
                                    key: 'sent',
                                    className: 'text-green-400'
                                }, '✓'),
                                msg.delivered && React.createElement('span', {
                                    key: 'delivered',
                                    className: 'text-green-400'
                                }, '✓'),
                                msg.read && React.createElement('span', {
                                    key: 'read',
                                    className: 'text-blue-400'
                                }, '👁️')
                            ])
                        ]),
                        React.createElement('p', {
                            key: 'message',
                            className: 'text-gray-300 text-sm mb-2'
                        }, msg.message.substring(0, 100) + '...'),
                        React.createElement('p', {
                            key: 'time',
                            className: 'text-gray-400 text-xs'
                        }, new Date(msg.timestamp).toLocaleString('pt-BR'))
                    ])
                ))
            ])
        ]);
    };

    // Render templates manager
    const renderTemplates = () => {
        return React.createElement('div', {
            className: 'space-y-6'
        }, [
            React.createElement('div', {
                key: 'header',
                className: 'flex justify-between items-center'
            }, [
                React.createElement('h3', {
                    key: 'title',
                    className: 'text-xl font-bold text-white'
                }, '📝 Gerenciar Templates'),
                React.createElement('button', {
                    key: 'add',
                    className: 'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
                }, '+ Novo Template')
            ]),

            React.createElement('div', {
                key: 'templates',
                className: 'grid grid-cols-1 lg:grid-cols-2 gap-6'
            }, templates.map(template =>
                React.createElement('div', {
                    key: template.id,
                    className: 'glass-effect p-6 rounded-lg'
                }, [
                    React.createElement('div', {
                        key: 'header',
                        className: 'flex justify-between items-start mb-4'
                    }, [
                        React.createElement('h4', {
                            key: 'name',
                            className: 'text-lg font-semibold text-white'
                        }, template.name),
                        React.createElement('div', {
                            key: 'actions',
                            className: 'flex items-center space-x-2'
                        }, [
                            React.createElement('label', {
                                key: 'toggle',
                                className: 'flex items-center cursor-pointer'
                            }, [
                                React.createElement('input', {
                                    key: 'checkbox',
                                    type: 'checkbox',
                                    checked: template.active,
                                    onChange: (e) => {
                                        setTemplates(prev => 
                                            prev.map(t => 
                                                t.id === template.id 
                                                    ? { ...t, active: e.target.checked }
                                                    : t
                                            )
                                        );
                                    },
                                    className: 'mr-2'
                                }),
                                React.createElement('span', {
                                    key: 'label',
                                    className: 'text-white text-sm'
                                }, 'Ativo')
                            ])
                        ])
                    ]),
                    React.createElement('div', {
                        key: 'template',
                        className: 'bg-gray-800 p-4 rounded-lg mb-4'
                    }, [
                        React.createElement('pre', {
                            key: 'content',
                            className: 'text-gray-300 text-sm whitespace-pre-wrap'
                        }, template.template)
                    ]),
                    React.createElement('div', {
                        key: 'variables',
                        className: 'flex flex-wrap gap-2'
                    }, template.variables.map(variable =>
                        React.createElement('span', {
                            key: variable,
                            className: 'bg-blue-600 text-white px-2 py-1 rounded text-xs'
                        }, `{{${variable}}}`)
                    ))
                ])
            ))
        ]);
    };

    return React.createElement('div', {
        className: 'space-y-6'
    }, [
        // Header
        React.createElement('div', {
            key: 'header',
            className: 'flex items-center space-x-4 mb-6'
        }, [
            React.createElement('div', {
                key: 'logo',
                className: 'whatsapp-button'
            }, [
                React.createElement('span', { key: 'icon' }, '📱'),
                'WhatsApp Business'
            ]),
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
                }, 'Integração Ativa')
            ])
        ]),

        // Tabs
        React.createElement('div', {
            key: 'tabs',
            className: 'flex space-x-4 mb-6'
        }, [
            ['dashboard', '📊 Dashboard'],
            ['templates', '📝 Templates'],
            ['bulk', '📢 Envio em Massa']
        ].map(([tab, label]) =>
            React.createElement('button', {
                key: tab,
                onClick: () => setActiveTab(tab),
                className: `px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    activeTab === tab 
                        ? 'bg-green-600 text-white' 
                        : 'glass-effect text-white hover:bg-white hover:bg-opacity-20'
                }`
            }, label)
        )),

        // Content
        activeTab === 'dashboard' && renderDashboard(),
        activeTab === 'templates' && renderTemplates()
    ]);
};

export default WhatsAppIntegration;
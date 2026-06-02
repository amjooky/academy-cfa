'use client';

import React, { useState } from 'react';

// =========================================================
// MOCK STATE & DATA FOR THE SUPER ADMIN SAAS SUITE
// =========================================================
const initialTenants = [
  { id: 't1', name: 'Demo Sports Academy', subdomain: 'demo', plan: 'PRO', status: 'active', players: 12 },
  { id: 't2', name: 'Rades Football Club', subdomain: 'rades-fc', plan: 'ELITE', status: 'active', players: 45 },
  { id: 't3', name: 'Sousse Athletics Academy', subdomain: 'sousse-athletics', plan: 'STARTER', status: 'pending', players: 0 }
];

const initialKycTasks = [
  { id: 'kyc1', coachName: 'Nabil Maaloul', email: 'nabil@coach.com', documentType: 'National ID & UEFA A License', status: 'pending' },
  { id: 'kyc2', coachName: 'Radhi Jaidi', email: 'radhi@coach.com', documentType: 'UEFA Pro Coach License', status: 'pending' }
];

const initialServiceStatus = [
  { name: 'Auth Service', port: 3001, status: 'healthy', lag: '2ms' },
  { name: 'Academy Service', port: 3002, status: 'healthy', lag: '5ms' },
  { name: 'Planning Service', port: 3003, status: 'healthy', lag: '3ms' },
  { name: 'Pedagogy Service', port: 3004, status: 'healthy', lag: '12ms' },
  { name: 'Payment Service', port: 3005, status: 'healthy', lag: '8ms' },
  { name: 'Notification Service', port: 3006, status: 'healthy', lag: '15ms' },
  { name: 'Gamification Service', port: 3007, status: 'healthy', lag: '4ms' },
  { name: 'AI Service', port: 3008, status: 'healthy', lag: '18ms' },
  { name: 'Analytics Service', port: 3009, status: 'healthy', lag: '25ms' }
];

export default function SuperAdminPage() {
  const [tenants, setTenants] = useState(initialTenants);
  const [kycTasks, setKycTasks] = useState(initialKycTasks);
  const [services, setServices] = useState(initialServiceStatus);

  // New tenant state parameters
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantSubdomain, setNewTenantSubdomain] = useState('');
  const [newTenantPlan, setNewTenantPlan] = useState('STARTER');
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Provision Tenant function
  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantName || !newTenantSubdomain) return;

    setIsProvisioning(true);

    setTimeout(() => {
      const newTenant = {
        id: `t_${Date.now()}`,
        name: newTenantName,
        subdomain: newTenantSubdomain.trim().toLowerCase(),
        plan: newTenantPlan,
        status: 'active',
        players: 0
      };

      setTenants(prev => [...prev, newTenant]);
      setNewTenantName('');
      setNewTenantSubdomain('');
      setIsProvisioning(false);
    }, 1500);
  };

  // KYC verification action
  const handleResolveKyc = (id: string, approve: boolean) => {
    setKycTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: approve ? 'approved' : 'declined' };
      }
      return t;
    }));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      
      {/* =========================================================
          TOP BANNER BRAND BAR
          ========================================================= */}
      <header style={{
        background: '#070518',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1.25rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.75rem' }}>⚡</span>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em'
            }}>
              ATHLETICA SAAS SUPER-ADMIN
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>SYSTEM LEVEL SECTOR CONTROL</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span className="glass-card" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 700, borderColor: 'rgba(244,114,182,0.2)' }}>
            👑 Global Manager
          </span>
        </div>
      </header>

      {/* =========================================================
          MAIN MULTI-ROW DASHBOARD WORKSPACE
          ========================================================= */}
      <main style={{ flexGrow: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* KPI stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>GLOBAL REVENUE RUNRATE</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: 'var(--accent-pink)' }}>4,850 TND</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>↑ 18% vs last month</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>PROVISIONED SCHEMAS</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: 'var(--accent-purple)' }}>{tenants.length} Tenants</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>All Isolated via Dynamic PL/pgSQL</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>ACTIVE GLOBAL USERS</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: 'var(--accent-blue)' }}>250+ Users</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>Athletes, Coaches & Admins</span>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700 }}>SYSTEMS TELEMETRY</span>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0', color: 'var(--accent-green)' }}>100% HEALTHY</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)' }}>9 Microservices Active</span>
          </div>
        </div>

        {/* Row 2: Tenant Provisioning and Service Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          
          {/* Tenant provisioning grid and controls */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Provisioned Tenant Schemas</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Realtime multi-tenant mapping catalog</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '2rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 0' }}>Academy Name</th>
                  <th>Subdomain</th>
                  <th>Subscription Tier</th>
                  <th>Enrolled Players</th>
                  <th>Database Status</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem 0', fontWeight: 700 }}>{t.name}</td>
                    <td style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{t.subdomain}.athletica.com</td>
                    <td>
                      <span style={{
                        background: t.plan === 'ELITE' ? 'rgba(244,114,182,0.1)' : t.plan === 'PRO' ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.05)',
                        color: t.plan === 'ELITE' ? 'var(--accent-pink)' : t.plan === 'PRO' ? 'var(--accent-purple)' : 'var(--text-secondary)',
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700
                      }}>{t.plan}</span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{t.players} Players</td>
                    <td>
                      <span style={{
                        color: t.status === 'active' ? 'var(--accent-green)' : 'var(--accent-amber)',
                        display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: t.status === 'active' ? 'var(--accent-green)' : 'var(--accent-amber)' }}></span>
                        {t.status === 'active' ? 'SCHEMAS LOADED' : 'PROVISIONING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Quick provision form */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.5rem' }}>
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>⚡ Fast Schema Provisioning Console</h5>
              <form onSubmit={handleProvisionTenant} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: '1rem', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Academy Name</label>
                  <input type="text" value={newTenantName} onChange={e => setNewTenantName(e.target.value)} placeholder="e.g. Sfax Athletic" style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.6rem', borderRadius: '6px', color: 'white', fontSize: '0.85rem'
                  }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Subdomain</label>
                  <input type="text" value={newTenantSubdomain} onChange={e => setNewTenantSubdomain(e.target.value)} placeholder="e.g. sfax" style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.6rem', borderRadius: '6px', color: 'white', fontSize: '0.85rem'
                  }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Subscription Plan</label>
                  <select value={newTenantPlan} onChange={e => setNewTenantPlan(e.target.value)} style={{
                    width: '100%', background: 'var(--bg-tertiary)', border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.6rem', borderRadius: '6px', color: 'white', fontSize: '0.85rem'
                  }}>
                    <option value="STARTER">STARTER</option>
                    <option value="PRO">PRO</option>
                    <option value="ELITE">ELITE</option>
                  </select>
                </div>
                <button type="submit" className="glow-btn" style={{
                  padding: '0.6rem 1.25rem', borderRadius: '6px', height: 'fit-content'
                }} disabled={isProvisioning}>
                  {isProvisioning ? 'Auto provisioning PL/pgSQL...' : 'PROVISION SCHEMA'}
                </button>
              </form>
            </div>
          </div>

          {/* Microservices Diagnostics Logs */}
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Telemetry Services</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {services.map(srv => (
                <div key={srv.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>{srv.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Port: {srv.port}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.8rem',
                      display: 'block'
                    }}>● ONLINE</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Lag: {srv.lag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Row 3: KYC verification dispatcher and tasks list */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Coach KYC License Verification Queue</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {kycTasks.map(task => (
              <div key={task.id} className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'white' }}>{task.coachName}</strong>
                  <span style={{
                    fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700,
                    color: task.status === 'pending' ? 'var(--accent-amber)' : task.status === 'approved' ? 'var(--accent-green)' : 'var(--accent-pink)',
                    background: task.status === 'pending' ? 'rgba(245,158,11,0.1)' : task.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(244,114,182,0.1)'
                  }}>{task.status.toUpperCase()}</span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>📧 Email: {task.email}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>📂 Provided Docs: {task.documentType}</p>

                {task.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => handleResolveKyc(task.id, true)} style={{
                      flexGrow: 1, background: 'var(--accent-green)', border: 'none', padding: '0.5rem',
                      borderRadius: '6px', color: '#000', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                    }}>APPROVE LICENSE</button>
                    <button onClick={() => handleResolveKyc(task.id, false)} style={{
                      flexGrow: 1, background: 'transparent', border: '1px solid var(--accent-pink)', padding: '0.5rem',
                      borderRadius: '6px', color: 'var(--accent-pink)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                    }}>DECLINE</button>
                  </div>
                )}
                {task.status !== 'pending' && (
                  <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    Resolved - System logs generated
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}

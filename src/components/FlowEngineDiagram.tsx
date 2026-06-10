import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import './FlowEngineDiagram.css';

interface FlowEngineDiagramProps {
  onClose: () => void;
}

type BoxKey = 'http' | 'flowservice' | 'abstract' | 'runner' | 'memory' | 'mongo' | 'redis';
type SubDiagram = 'runner' | 'memory' | 'bootstrap';

const DIAGRAM_FOR_BOX: Partial<Record<BoxKey, SubDiagram>> = {
  flowservice: 'bootstrap',
  runner: 'runner',
  memory: 'memory',
};

// ─── SUB-DIAGRAM: FlowRunner lifecycle ───────────────────────────────────────
function RunnerDiagram() {
  const { t } = useTranslation('technical');
  return (
    <svg width="100%" viewBox="0 0 680 480" role="img" className="fed-svg">
      <title>{t('diagrams.runner.title')}</title>
      <defs>
        <marker id="sa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Phase 1 label */}
      <text className="fed-ts fed-phase" x="340" y="22" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.phase1')}</text>

      <g className="fed-box-gray">
        <rect x="40" y="36" width="160" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="120" y="58" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.flowJson')}</text>
        <text className="fed-ts" x="120" y="76" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.configFromDb')}</text>
      </g>
      <line x1="200" y1="62" x2="238" y2="62" stroke="#888780" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="238" y="36" width="160" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="318" y="58" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.fsmCompiler')}</text>
        <text className="fed-ts" x="318" y="76" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.sanitizeTask')}</text>
      </g>
      <line x1="398" y1="62" x2="436" y2="62" stroke="#378ADD" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="436" y="36" width="204" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="538" y="58" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.xstateMachine')}</text>
        <text className="fed-ts" x="538" y="76" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.actorStart')}</text>
      </g>

      {/* Divider */}
      <line x1="40" y1="108" x2="640" y2="108" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 3" />
      <text className="fed-ts fed-phase" x="340" y="124" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.phase2')}</text>

      {/* Redis load */}
      <g className="fed-box-coral">
        <rect x="40" y="140" width="160" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="120" y="162" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.redis')}</text>
        <text className="fed-ts" x="120" y="180" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.previousSnapshot')}</text>
      </g>
      <line x1="200" y1="166" x2="238" y2="166" stroke="#D85A30" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="238" y="140" width="184" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="330" y="162" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.restoreFromSnapshot')}</text>
        <text className="fed-ts" x="330" y="180" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.actorRestored')}</text>
      </g>
      <line x1="422" y1="166" x2="460" y2="166" stroke="#378ADD" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="460" y="140" width="180" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="550" y="162" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.actorSend')}</text>
        <text className="fed-ts" x="550" y="180" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.stateTransition')}</text>
      </g>

      <line x1="550" y1="192" x2="550" y2="232" stroke="#378ADD" strokeWidth="1" markerEnd="url(#sa)" fill="none" />

      <g className="fed-box-blue">
        <rect x="460" y="232" width="180" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="550" y="254" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.actorGetSnapshot')}</text>
        <text className="fed-ts" x="550" y="272" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.serializedState')}</text>
      </g>

      <line x1="460" y1="258" x2="222" y2="258" stroke="#D85A30" strokeWidth="1" markerEnd="url(#sa)" fill="none" />

      <g className="fed-box-coral">
        <rect x="40" y="232" width="182" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="131" y="254" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.redis')}</text>
        <text className="fed-ts" x="131" y="272" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.saveSnapshotTTL')}</text>
      </g>

      <line x1="330" y1="258" x2="330" y2="232" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#sa)" fill="none" />

      <g className="fed-box-gray">
        <rect x="238" y="232" width="184" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="330" y="254" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.getAgentData')}</text>
        <text className="fed-ts" x="330" y="272" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.responseToClient')}</text>
      </g>

      {/* Divider */}
      <line x1="40" y1="306" x2="640" y2="306" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" strokeDasharray="4 3" />
      <text className="fed-ts fed-phase" x="340" y="322" textAnchor="middle" dominantBaseline="central">{t('diagrams.runner.phase3')}</text>

      <g className="fed-box-gray">
        <rect x="40" y="338" width="160" height="42" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="120" y="359" textAnchor="middle" dominantBaseline="central">"Inicio Simple"</text>
      </g>
      <line x1="200" y1="359" x2="248" y2="359" stroke="#888780" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="248" y="338" width="160" height="42" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="328" y="359" textAnchor="middle" dominantBaseline="central">"inicio_simple"</text>
      </g>

      <g className="fed-box-gray">
        <rect x="40" y="396" width="160" height="42" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="120" y="417" textAnchor="middle" dominantBaseline="central">"Main Menù"</text>
      </g>
      <line x1="200" y1="417" x2="248" y2="417" stroke="#888780" strokeWidth="1" markerEnd="url(#sa)" fill="none" />
      <g className="fed-box-blue">
        <rect x="248" y="396" width="160" height="42" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="328" y="417" textAnchor="middle" dominantBaseline="central">"main_menu"</text>
      </g>

      <text className="fed-ts" x="480" y="352" textAnchor="middle">{t('diagrams.runner.spacesToUnderscore')}</text>
      <text className="fed-ts" x="480" y="370" textAnchor="middle">{t('diagrams.runner.accentsRemoved')}</text>
      <text className="fed-ts" x="480" y="388" textAnchor="middle">{t('diagrams.runner.onlyLowercase')}</text>
      <text className="fed-ts" x="480" y="406" textAnchor="middle">{t('diagrams.runner.xstateEventName')}</text>
    </svg>
  );
}

// ─── SUB-DIAGRAM: MemoryManager 3-hash ───────────────────────────────────────
function MemoryDiagram() {
  const { t } = useTranslation('technical');
  return (
    <svg width="100%" viewBox="0 0 680 520" role="img" className="fed-svg">
      <title>{t('diagrams.memory.title')}</title>
      <defs>
        <marker id="ma" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Title */}
      <text className="fed-ts fed-phase" x="340" y="22" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.keyPattern')}</text>

      {/* Hash 1 — tools */}
      <g className="fed-box-coral">
        <rect x="40" y="40" width="180" height="130" rx="8" strokeWidth="1" />
        <text className="fed-th" x="130" y="68" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.varsTools')}</text>
        <text className="fed-ts" x="130" y="90" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.maxPriority')}</text>
        <text className="fed-ts" x="130" y="110" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.writtenByMcp')}</text>
        <text className="fed-ts" x="130" y="130" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.externalToPlatform')}</text>
        <text className="fed-ts" x="130" y="152" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.alwaysPrecedence')}</text>
      </g>

      {/* Hash 2 — convMiner */}
      <g className="fed-box-amber">
        <rect x="250" y="40" width="180" height="130" rx="8" strokeWidth="1" />
        <text className="fed-th" x="340" y="68" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.varsConvMiner')}</text>
        <text className="fed-ts" x="340" y="90" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.mediumPriority')}</text>
        <text className="fed-ts" x="340" y="110" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.valuesExtracted')}</text>
        <text className="fed-ts" x="340" y="130" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.fromConversation')}</text>
        <text className="fed-ts" x="340" y="152" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.populatedByLlm')}</text>
      </g>

      {/* Hash 3 — definitions */}
      <g className="fed-box-gray">
        <rect x="460" y="40" width="180" height="130" rx="8" strokeWidth="1" />
        <text className="fed-th" x="550" y="68" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.varsDefinitions')}</text>
        <text className="fed-ts" x="550" y="90" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.minPriority')}</text>
        <text className="fed-ts" x="550" y="110" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.defaultFromConfig')}</text>
        <text className="fed-ts" x="550" y="130" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.fromFlow')}</text>
        <text className="fed-ts" x="550" y="152" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.fixedVersion')}</text>
      </g>

      {/* Priority flow */}
      <text className="fed-ts fed-phase" x="340" y="202" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.priorityAlgorithm')}</text>

      <g className="fed-box-coral">
        <rect x="240" y="218" width="200" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="240" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.getVariable')}</text>
      </g>

      <line x1="340" y1="262" x2="340" y2="290" stroke="#D85A30" strokeWidth="1" markerEnd="url(#ma)" fill="none" />

      <g className="fed-box-coral">
        <rect x="240" y="290" width="200" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="312" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.checkTools')}</text>
      </g>

      {/* Found → return */}
      <line x1="440" y1="312" x2="540" y2="312" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="490" y="304" textAnchor="middle">{t('diagrams.memory.found')}</text>
      <g className="fed-box-teal">
        <rect x="540" y="290" width="100" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="590" y="312" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.return')}</text>
      </g>

      <line x1="340" y1="334" x2="340" y2="362" stroke="#D85A30" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="356" y="350" textAnchor="start">{t('diagrams.memory.notFound')}</text>

      <g className="fed-box-amber">
        <rect x="240" y="362" width="200" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="384" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.checkConvMiner')}</text>
      </g>

      <line x1="440" y1="384" x2="540" y2="384" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="490" y="376" textAnchor="middle">{t('diagrams.memory.found')}</text>
      <g className="fed-box-teal">
        <rect x="540" y="362" width="100" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="590" y="384" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.return')}</text>
      </g>

      <line x1="340" y1="406" x2="340" y2="434" stroke="#BA7517" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="356" y="422" textAnchor="start">{t('diagrams.memory.notFound')}</text>

      <g className="fed-box-gray">
        <rect x="240" y="434" width="200" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="456" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.checkDefinitions')}</text>
      </g>

      <line x1="440" y1="456" x2="540" y2="456" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="490" y="448" textAnchor="middle">{t('diagrams.memory.found')}</text>
      <g className="fed-box-teal">
        <rect x="540" y="434" width="100" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="590" y="456" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.return')}</text>
      </g>

      <line x1="240" y1="456" x2="140" y2="456" stroke="#888780" strokeWidth="1" markerEnd="url(#ma)" fill="none" />
      <text className="fed-ts" x="190" y="448" textAnchor="middle">{t('diagrams.memory.notFound')}</text>
      <g className="fed-box-gray">
        <rect x="40" y="434" width="100" height="44" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="90" y="456" textAnchor="middle" dominantBaseline="central">{t('diagrams.memory.returnNull')}</text>
      </g>
    </svg>
  );
}

// ─── SUB-DIAGRAM: Bootstrap sequence ─────────────────────────────────────────
function BootstrapDiagram() {
  const { t } = useTranslation('technical');
  return (
    <svg width="100%" viewBox="0 0 680 480" role="img" className="fed-svg">
      <title>{t('diagrams.bootstrap.title')}</title>
      <defs>
        <marker id="ba" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Bootstrap orchestrator */}
      <g className="fed-box-blue">
        <rect x="240" y="20" width="200" height="52" rx="8" strokeWidth="1" />
        <text className="fed-th" x="340" y="42" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.bootstrap')}</text>
        <text className="fed-ts" x="340" y="60" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.initialize')}</text>
      </g>

      {/* Step 1 */}
      <line x1="340" y1="72" x2="340" y2="100" stroke="#378ADD" strokeWidth="1" markerEnd="url(#ba)" fill="none" />
      <text className="fed-ts fed-step" x="356" y="88" textAnchor="start">{t('diagrams.bootstrap.step1')}</text>

      <g className="fed-box-teal">
        <rect x="200" y="100" width="280" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="122" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.onInit')}</text>
        <text className="fed-ts" x="340" y="140" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.connections')}</text>
      </g>

      {/* Step 2 */}
      <line x1="340" y1="152" x2="340" y2="180" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ba)" fill="none" />
      <text className="fed-ts fed-step" x="356" y="168" textAnchor="start">{t('diagrams.bootstrap.step2')}</text>

      <g className="fed-box-amber">
        <rect x="200" y="180" width="280" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="202" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.assetInit')}</text>
        <text className="fed-ts" x="340" y="220" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.mongoConfig')}</text>
      </g>

      {/* Step 3a + 3b side by side */}
      <line x1="340" y1="232" x2="340" y2="256" stroke="#BA7517" strokeWidth="1" markerEnd="url(#ba)" fill="none" />
      <text className="fed-ts fed-step" x="356" y="246" textAnchor="start">{t('diagrams.bootstrap.step3')}</text>

      <g className="fed-box-amber">
        <rect x="60" y="256" width="240" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="180" y="278" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.envFixture')}</text>
        <text className="fed-ts" x="180" y="296" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.loadEnvs')}</text>
      </g>

      <g className="fed-box-amber">
        <rect x="380" y="256" width="240" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="500" y="278" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.fixtureLoader')}</text>
        <text className="fed-ts" x="500" y="296" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.loadFlows')}</text>
      </g>

      <line x1="240" y1="282" x2="300" y2="282" stroke="#BA7517" strokeWidth="0.5" strokeDasharray="3 2" fill="none" />
      <line x1="380" y1="282" x2="320" y2="282" stroke="#BA7517" strokeWidth="0.5" strokeDasharray="3 2" fill="none" />

      {/* Step 4 */}
      <line x1="340" y1="308" x2="340" y2="336" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ba)" fill="none" />
      <text className="fed-ts fed-step" x="356" y="324" textAnchor="start">{t('diagrams.bootstrap.step4')}</text>

      <g className="fed-box-teal">
        <rect x="200" y="336" width="280" height="52" rx="8" strokeWidth="0.5" />
        <text className="fed-th" x="340" y="358" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.newFlowService')}</text>
        <text className="fed-ts" x="340" y="376" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.instanceReady')}</text>
      </g>

      {/* Ready */}
      <line x1="340" y1="388" x2="340" y2="416" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#ba)" fill="none" />

      <g className="fed-box-blue">
        <rect x="240" y="416" width="200" height="44" rx="8" strokeWidth="1" />
        <text className="fed-th" x="340" y="438" textAnchor="middle" dominantBaseline="central">{t('diagrams.bootstrap.ready')}</text>
      </g>
    </svg>
  );
}

const SUB_DIAGRAMS: Record<SubDiagram, { component: React.FC }> = {
  runner: { component: RunnerDiagram },
  memory: { component: MemoryDiagram },
  bootstrap: { component: BootstrapDiagram },
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FlowEngineDiagram({ onClose }: FlowEngineDiagramProps) {
  const { t } = useTranslation('technical');
  const [active, setActive] = useState<BoxKey | null>(null);
  const [subDiagram, setSubDiagram] = useState<SubDiagram | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (subDiagram) setSubDiagram(null);
        else if (active) setActive(null);
        else onClose();
      }
    },
    [active, subDiagram, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const toggle = (key: BoxKey) => {
    setSubDiagram(null);
    setActive(prev => prev === key ? null : key);
  };

  const openSubDiagram = (d: SubDiagram) => setSubDiagram(d);
  const closeSubDiagram = () => setSubDiagram(null);

  const exp = active
    ? {
        title: t(`explanations.${active}.title`),
        body: t(`explanations.${active}.body`),
        diagram: DIAGRAM_FOR_BOX[active],
      }
    : null;
  const SubComp = subDiagram ? SUB_DIAGRAMS[subDiagram].component : null;

  return (
    <div className="fed-backdrop" onClick={onClose}>
      <div className="fed-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="fed-header">
          <div className="fed-title-group">
            {subDiagram ? (
              <>
                <button className="fed-back" onClick={closeSubDiagram}>
                  <FaArrowLeft /> {t('backButton')}
                </button>
                <h3 className="fed-title">{t(`diagrams.${subDiagram}.label`)}</h3>
              </>
            ) : (
              <>
                <span className="fed-label">{t('architecture')}</span>
                <h3 className="fed-title">{t('mainTitle')}</h3>
              </>
            )}
          </div>
          <button className="fed-close" onClick={onClose} aria-label={t('closeDiagram')}>
            <FaTimes />
          </button>
        </div>

        {/* Explanation panel — only on overview */}
        {!subDiagram && (
          exp ? (
            <div className="fed-explanation">
              <div className="fed-explanation-header">
                <span className="fed-explanation-title">{exp.title}</span>
                <button className="fed-explanation-close" onClick={() => setActive(null)}>
                  <FaTimes />
                </button>
              </div>
              <p className="fed-explanation-body">{exp.body}</p>
              {exp.diagram && (
                <button
                  className="fed-diagram-btn"
                  onClick={() => openSubDiagram(exp.diagram!)}
                >
                  {t('viewDetailedDiagram')}
                </button>
              )}
            </div>
          ) : (
              <p className="fed-hint">{t('hint')}</p>
          )
        )}

        {/* Content */}
        <div className="fed-scroll">
          {SubComp ? (
            <SubComp />
          ) : (
            <svg width="100%" viewBox="0 0 680 740" role="img" className="fed-svg">
              <title>{t('diagrams.main.title')}</title>
              <desc>{t('diagrams.main.description')}</desc>
              <defs>
                <marker id="fed-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>

              <g className={`fed-layer-purple fed-clickable${active === 'http' ? ' fed-active' : ''}`} onClick={() => toggle('http')}>
                <rect x="40" y="28" width="600" height="72" rx="12" strokeWidth="0.5" />
                <text className="fed-th" x="340" y="54" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.httpLayer')}</text>
                <text className="fed-ts" x="340" y="76" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.httpEndpoints')}</text>
              </g>

              <g className="fed-layer-teal">
                <rect x="40" y="130" width="600" height="130" rx="12" strokeWidth="0.5" />
                <text className="fed-th" x="340" y="150" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.serviceLayer')}</text>
              </g>

              <g className={`fed-box-teal fed-clickable${active === 'flowservice' ? ' fed-active' : ''}`} onClick={() => toggle('flowservice')}>
                <rect x="64" y="162" width="250" height="82" rx="8" strokeWidth="1" />
                <text className="fed-th" x="189" y="192" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.flowService')}</text>
                <text className="fed-ts" x="189" y="212" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.loadFlow')}</text>
                <text className="fed-ts" x="189" y="228" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.cleanup')}</text>
              </g>

              <g className={`fed-box-teal fed-clickable${active === 'abstract' ? ' fed-active' : ''}`} onClick={() => toggle('abstract')}>
                <rect x="366" y="162" width="250" height="82" rx="8" strokeWidth="1" />
                <text className="fed-th" x="491" y="192" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.abstract')}</text>
                <text className="fed-ts" x="491" y="212" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.initConversation')}</text>
                <text className="fed-ts" x="491" y="228" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.changeResume')}</text>
              </g>

              <line x1="314" y1="203" x2="366" y2="203" stroke="#5DCAA5" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#fed-arrow)" fill="none" />
              <text className="fed-ts" x="340" y="196" textAnchor="middle">{t('diagrams.main.extends')}</text>
              <line x1="340" y1="100" x2="340" y2="130" stroke="#7F77DD" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />

              <g className="fed-layer-blue">
                <rect x="40" y="292" width="600" height="130" rx="12" strokeWidth="0.5" />
                <text className="fed-th" x="340" y="312" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.coreComponents')}</text>
              </g>

              <g className={`fed-box-blue fed-clickable${active === 'runner' ? ' fed-active' : ''}`} onClick={() => toggle('runner')}>
                <rect x="64" y="324" width="250" height="82" rx="8" strokeWidth="1" />
                <text className="fed-th" x="189" y="352" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.runner')}</text>
                <text className="fed-ts" x="189" y="372" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.fsmCompiler')}</text>
                <text className="fed-ts" x="189" y="388" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.compileFsm')}</text>
              </g>

              <g className={`fed-box-blue fed-clickable${active === 'memory' ? ' fed-active' : ''}`} onClick={() => toggle('memory')}>
                <rect x="366" y="324" width="250" height="82" rx="8" strokeWidth="1" />
                <text className="fed-th" x="491" y="352" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.memory')}</text>
                <text className="fed-ts" x="491" y="372" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.threeHash')}</text>
                <text className="fed-ts" x="491" y="388" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.priorityResolution')}</text>
              </g>

              <line x1="189" y1="244" x2="189" y2="324" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />
              <line x1="491" y1="244" x2="491" y2="324" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />
              <line x1="340" y1="260" x2="340" y2="292" stroke="#5DCAA5" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />

              <g className="fed-layer-gray">
                <rect x="40" y="454" width="600" height="200" rx="12" strokeWidth="0.5" />
                <text className="fed-th" x="340" y="474" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.storageLayer')}</text>
              </g>

              <g className={`fed-box-amber fed-clickable${active === 'mongo' ? ' fed-active' : ''}`} onClick={() => toggle('mongo')}>
                <rect x="64" y="488" width="170" height="146" rx="8" strokeWidth="1" />
                <text className="fed-th" x="149" y="516" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.mongo')}</text>
                <text className="fed-ts" x="149" y="536" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.assetContainer')}</text>
                <text className="fed-ts" x="149" y="554" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.flowPersistence')}</text>
                <text className="fed-ts" x="149" y="572" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.flowDomainObject')}</text>
                <text className="fed-ts" x="149" y="590" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.fixtureFlows')}</text>
                <text className="fed-ts" x="149" y="608" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.environmentsConfig')}</text>
              </g>

              <g className={`fed-box-gray fed-clickable${active === 'redis' ? ' fed-active' : ''}`} onClick={() => toggle('redis')}>
                <rect x="255" y="488" width="261" height="146" rx="8" strokeWidth="1" />
                <text className="fed-th" x="385" y="516" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.redis')}</text>
                <text className="fed-ts" x="385" y="536" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.singleton')}</text>
                <text className="fed-ts" x="385" y="554" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.fsmSnapshots')}</text>
                <text className="fed-ts" x="385" y="572" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.varsHashes')}</text>
                <text className="fed-ts" x="385" y="590" textAnchor="middle" dominantBaseline="central">{t('diagrams.main.varsTtl')}</text>
              </g>

              <line x1="149" y1="422" x2="149" y2="488" stroke="#888780" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />
              <line x1="355" y1="422" x2="355" y2="488" stroke="#888780" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />
              <line x1="491" y1="422" x2="491" y2="488" stroke="#888780" strokeWidth="1" markerEnd="url(#fed-arrow)" fill="none" />

              <rect x="40" y="676" width="600" height="44" rx="8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <text className="fed-ts" x="60" y="698" dominantBaseline="central">{t('diagrams.main.redisPriority')}</text>
              <rect x="168" y="690" width="8" height="8" rx="2" fill="#D85A30" />
              <text className="fed-ts" x="182" y="698" dominantBaseline="central">{t('diagrams.main.toolsMax')}</text>
              <rect x="310" y="690" width="8" height="8" rx="2" fill="#888780" />
              <text className="fed-ts" x="324" y="698" dominantBaseline="central">{t('diagrams.main.convMiner')}</text>
              <rect x="448" y="690" width="8" height="8" rx="2" fill="#639922" />
              <text className="fed-ts" x="462" y="698" dominantBaseline="central">{t('diagrams.main.definitions')}</text>
            </svg>
          )}
        </div>

      </div>
    </div>
  );
}

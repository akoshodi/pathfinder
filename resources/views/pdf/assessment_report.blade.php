<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Assessment Report</title>
    <style>
        body { font-family: DejaVu Sans, Arial, sans-serif; color: #111; font-size: 12px; }
        .brand { font-weight: bold; color: #1f2937; letter-spacing: 0.5px; }
        .header { text-align: center; margin-bottom: 16px; }
        .muted { color: #666; font-size: 11px; }
        h1 { font-size: 20px; margin: 0 0 8px; }
        h2 { font-size: 16px; margin: 16px 0 8px; }
        h3 { font-size: 13px; margin: 12px 0 6px; }
        .section { margin-bottom: 16px; }
        .grid { display: table; width: 100%; table-layout: fixed; }
        .col { display: table-cell; vertical-align: top; padding-right: 12px; }
        ul { margin: 6px 0 6px 18px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background: #f3f4f6; }
        .viz { margin-top: 8px; }
        .bar { background: #e5e7eb; border-radius: 4px; height: 8px; overflow: hidden; }
        .bar > span { display: block; height: 8px; background: #2563eb; }
        .legend { font-size: 11px; color: #374151; margin-bottom: 4px; }
        .branding { margin-bottom: 12px; text-align: center; }
        .branding .logo { font-size: 18px; }
    </style>
</head>
<body>
<div class="branding">
    <div class="logo brand">Pathfinder</div>
    <div class="muted">Personalized Career Guidance</div>
</div>
<div class="header">
    <h1>{{ $assessment->name }} — Report</h1>
    <div class="muted">Attempt #{{ $attempt->id }} • Completed: {{ optional($attempt->completed_at)->format('Y-m-d H:i') }}</div>
</div>

<div class="section">
    <h2>Summary</h2>
    <p>{{ $report->summary }}</p>
</div>

@if(!empty($report->top_traits))
<div class="section">
    <h2>Top Traits</h2>
    <ul>
        @foreach($report->top_traits as $trait)
            <li>{{ $trait }}</li>
        @endforeach
    </ul>
</div>
@endif

@if($category === 'career_interest' && $riasec)
<div class="section">
    <h2>RIASEC Overview</h2>
    <div>Holland Code: <strong>{{ $riasec['holland_code'] }}</strong></div>
    <table>
        <thead>
        <tr>
            <th>Code</th><th>Score</th>
        </tr>
        </thead>
        <tbody>
        @foreach($riasec['scores'] as $code => $score)
            <tr>
                <td>{{ $code }}</td>
                <td>{{ $score }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    @php
        $labels = ['R','I','A','S','E','C'];
    @endphp
    <div class="viz">
        @foreach($labels as $code)
            @php $val = $riasec['scores'][$code] ?? 0; $pct = max(0, min(100, $val)); @endphp
            <div class="legend">{{ $code }}</div>
            <div class="bar"><span style="width: {{ $pct }}%"></span></div>
        @endforeach
    </div>
</div>
@endif

@if(!empty($report->insights))
<div class="section">
    <h2>Insights</h2>
    @foreach($report->insights as $insight)
        <h3>{{ $insight['title'] ?? '' }}</h3>
        <p>{{ $insight['description'] ?? '' }}</p>
        @if(!empty($insight['work_environments']))
            <div class="muted">Suggested Environments: {{ implode(', ', $insight['work_environments']) }}</div>
        @endif
    @endforeach
</div>
@endif

@if(!empty($report->recommendations))
<div class="section">
    <h2>Recommendations</h2>
    <ul>
        @foreach($report->recommendations as $rec)
            <li>{{ is_array($rec) ? json_encode($rec) : $rec }}</li>
        @endforeach
    </ul>
</div>
@endif

@php
    $viz = $report->visualization_data ?? [];
    $vizLabels = $viz['labels'] ?? [];
    $data = $viz['datasets'][0]['data'] ?? [];
@endphp

@if(!empty($vizLabels) && !empty($data))
    <div class="section">
        <h2>Visualizations</h2>
        @foreach($vizLabels as $i => $label)
            @php
                $val = (int) ($data[$i] ?? 0);
                // Normalize to 0-100 range for bar width; for skills (1-5), scale by 20
                $width = max(0, min(100, $viz['type'] === 'bar' ? ($val <= 5 ? $val * 20 : $val) : $val));
            @endphp
            <div class="legend">{{ $label }}</div>
            <div class="bar"><span style="width: {{ $width }}%"></span></div>
        @endforeach
    </div>
@endif

</body>
</html>
